import { MigrationInterface, QueryRunner,TableForeignKey } from "typeorm"

export class SalesChannlesConnectWithStore1701607589261
  implements MigrationInterface
{
  name = "salesChannelsConnectWithStore1701607589261"

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the sales_channel table
    await queryRunner.query(`
      ALTER TABLE "sales_channel"
      ADD COLUMN "store_id" character varying NOT NULL,
      ADD CONSTRAINT "FK_store_id_in_sales_channel" 
        FOREIGN KEY ("store_id") REFERENCES "store"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;

      CREATE INDEX "IDX_store_id_in_sales_channel" ON "sales_channel" ("store_id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
      DROP INDEX "IDX_store_id_in_sales_channel";

      ALTER TABLE "sales_channel"
      DROP CONSTRAINT "FK_store_id_in_sales_channel";
    `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
      ALTER TABLE "sales_channel"
      DROP COLUMN "store_id";
    `)
  }
}
