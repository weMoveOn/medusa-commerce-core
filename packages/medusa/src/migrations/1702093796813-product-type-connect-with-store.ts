import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductTypeConnectWithStore1702093796813
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the sales_channel table
    await queryRunner.query(`
                  ALTER TABLE "product_type"
                  ADD COLUMN "store_id" character varying NOT NULL,
                  ADD CONSTRAINT "FK_store_id_in_product_type" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    
                  CREATE INDEX "IDX_store_id_in_product_type" ON "product_type" ("store_id");
                `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
                  DROP INDEX "IDX_store_id_in_product_type";
            
                  ALTER TABLE "product_type"
                  DROP CONSTRAINT "FK_store_id_in_product_type";
                `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
                  ALTER TABLE "product_type"
                  DROP COLUMN "store_id";
                `)
  }
}
