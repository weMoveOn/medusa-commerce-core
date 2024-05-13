import { MigrationInterface, QueryRunner } from "typeorm"

export class PriceListConnectWithStore1702095535102
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the price_list table
    await queryRunner.query(`
      ALTER TABLE "price_list"
      ADD COLUMN "store_id" character varying NOT NULL,
      ADD CONSTRAINT "FK_store_id_in_price_list" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
      
      CREATE INDEX "IDX_store_id_in_price_list" ON "price_list" ("store_id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
      DROP INDEX "IDX_store_id_in_price_list";
      
      ALTER TABLE "price_list"
      DROP CONSTRAINT "FK_store_id_in_price_list";
    `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
      ALTER TABLE "price_list"
      DROP COLUMN "store_id";
    `)
  }
}
