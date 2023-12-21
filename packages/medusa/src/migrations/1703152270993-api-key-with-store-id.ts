import { MigrationInterface, QueryRunner } from "typeorm"

export class ApiKeyWithStoreId1703152270993 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publishable_api_key" ADD COLUMN "store_id" character varying NOT NULL`)
        await queryRunner.query(`ALTER TABLE "publishable_api_key" ADD CONSTRAINT "FK_publishable_api_key_with_store" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publishable_api_key" DROP CONSTRAINT "FK_publishable_api_key_with_store"`)
        await queryRunner.query(`ALTER TABLE "publishable_api_key" DROP COLUMN "store_id"`)
    }

}
