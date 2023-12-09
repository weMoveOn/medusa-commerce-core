import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductTagsConnectWithStore1702093350980
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the sales_channel table
    await queryRunner.query(`
              ALTER TABLE "product_tag"
              ADD COLUMN "store_id" character varying NOT NULL,
              ADD CONSTRAINT "FK_store_id_in_product_tag" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

              CREATE INDEX "IDX_store_id_in_product_tag" ON "product_tag" ("store_id");
            `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
              DROP INDEX "IDX_store_id_in_product_tag";
        
              ALTER TABLE "product_tag"
              DROP CONSTRAINT "FK_store_id_in_product_tag";
            `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
              ALTER TABLE "product_tag"
              DROP COLUMN "store_id";
            `)
  }
}
