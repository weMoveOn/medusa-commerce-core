import fs from "fs"
import { isDefined, MedusaError } from "medusa-core-utils"
import { EntityManager } from "typeorm"
import { TransactionBaseService } from "../interfaces"
import { StoreTheme } from "../models"
import { StoreThemeRepository } from "../repositories/store_theme"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

import { FindConfig } from "../types/common"
import { buildQuery } from "../utils"

type InjectedDependencies = {
  manager: EntityManager
  storeThemeRepository: typeof StoreThemeRepository
}
const region = process.env.AWS_DEFAULT_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials and region must be defined");
}

let client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  },
});

class StoreThemeService extends TransactionBaseService {
  protected readonly storeThemeRepo_: typeof StoreThemeRepository

  constructor({ storeThemeRepository }: InjectedDependencies) {
    // eslint-disable-next-line prefer-rest-params
    super(arguments[0])

    this.storeThemeRepo_ = storeThemeRepository
  }


  async create(req: any) {
    const adminStoreThemeRepository = this.activeManager_.withRepository(
      this.storeThemeRepo_
    )
    const filePath = `./uploads/${req[0].key}`;
    const fileStream = fs.createReadStream(filePath);

    const data = {
      "Body": fileStream,
      "Bucket": process.env.AWS_BUCKET,
      "Key": `theme/${req[0].key}`,
    };
    const puts3object = new PutObjectCommand(data);
    const response = await client.send(puts3object);

    const createData: any = {};
    createData.store_id = "store_01HRS5564M5980DR73HH8J06RS"
    createData.name = "My New Shop"
    createData.is_published = false
    createData.serving_type = "bucket-only"
    createData.archive_path = `/theme/${req[0].key}`
    createData.serving_path = filePath

    try {
        const data = adminStoreThemeRepository.create(createData)
        const result = await adminStoreThemeRepository.save(data)

        if (response.$metadata.httpStatusCode===200){
          fs.unlinkSync(filePath);
        }
        return result
    } catch (error: any) {
      throw error
    }
  }


  async update(storeId: string, id: string): Promise<StoreTheme> {
    return await this.atomicPhase_(async (manager) => {
      const stRepo = manager.withRepository(this.storeThemeRepo_)
      const theme = await this.retrieve(storeId, id)
      if (theme.is_published === false){
        theme.is_published = true
      }

      await stRepo.save(theme)

      return theme
    })
  }

  async duplicate(storeId: string, id: string): Promise<StoreTheme> {
    return await this.atomicPhase_(async (manager) => {
      const stRepo = manager.withRepository(this.storeThemeRepo_)
      const theme = await this.retrieve(storeId, id)
      if (theme) {
        const { id: _, ...duplicatedTheme } = theme;
        if (duplicatedTheme.is_published === true){
          duplicatedTheme.is_published = false
        }

        const originalKey = duplicatedTheme.archive_path;
        const lastIndex = originalKey.lastIndexOf('.');
        const fileName = originalKey.substring(originalKey.lastIndexOf('/') + 1, lastIndex);
        const fileExtension = originalKey.substring(lastIndex);
        const newKey = `theme/${fileName}_duplicate${fileExtension}`;
        const sourcePath = `theme/${fileName}${fileExtension}`;

        const param = {
          "CopySource": sourcePath,
          "Bucket": "moveshop-test-bucket-234234234234",
          "Key": newKey,
        };
        const copys3object = new PutObjectCommand(param);
        const response = await client.send(copys3object);
        duplicatedTheme.archive_path = newKey

        const data = stRepo.create(duplicatedTheme)

        await stRepo.save(data);

        return data;
      } else {
        console.error(`Theme with ID ${id} not found for store ${storeId}`);
        return theme
      }
    })
  }

  /**
   * Gets an order by id.
   * @param {string} storeThemeId - id of order to retrieve
   * @param {Object} config - config object
   * @return {Promise<Order>} the order document
   */
  async retrieve(
    storeId: string,
    storeThemeId: string,
    config: FindConfig<StoreTheme> = {}
  ): Promise<StoreTheme | never> {
    if (!isDefined(storeThemeId)) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `"storeThemeId" must be defined`
      )
    }

    const stRepo = this.activeManager_.withRepository(this.storeThemeRepo_)

    const query = buildQuery({ store_id: storeId,id: storeThemeId }, config)
    const item = await stRepo.findOne(query)

    if (!item) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Store Theme with id: ${storeThemeId} was not found.`
      )
    }

    return item
  }
}

export default StoreThemeService
