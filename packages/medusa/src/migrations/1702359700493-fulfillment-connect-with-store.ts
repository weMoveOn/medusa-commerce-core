import { MigrationInterface, QueryRunner } from "typeorm"

export class FullfillmentConnectWithStore1702359700493
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the tracking_link table
    await queryRunner.query(`
              ALTER TABLE "fulfillment"
              ADD COLUMN "store_id" character varying NOT NULL,
              ADD CONSTRAINT "FK_store_id_in_fulfillment" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
              
              CREATE INDEX "IDX_store_id_in_fulfillment" ON "fulfillment" ("store_id");
            `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
              DROP INDEX "IDX_store_id_in_fulfillment";
              
              ALTER TABLE "fulfillment"
              DROP CONSTRAINT "FK_store_id_in_fulfillment";
            `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
              ALTER TABLE "fulfillment"
              DROP COLUMN "store_id";
            `)
  }
}
