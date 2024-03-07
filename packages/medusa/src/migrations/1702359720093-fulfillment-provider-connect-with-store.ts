import { MigrationInterface, QueryRunner } from "typeorm"

export class FullfillmentProviderConnectWithStore1702359720093
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the tracking_link table
    await queryRunner.query(`
                  ALTER TABLE "fulfillment_provider"
                  ADD COLUMN "store_id" character varying NOT NULL,
                  ADD CONSTRAINT "FK_store_id_in_fulfillment_provider" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
                  
                  CREATE INDEX "IDX_store_id_in_fulfillment_provider" ON "fulfillment_provider" ("store_id");
                `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
                  DROP INDEX "IDX_store_id_in_fulfillment_provider";
                  
                  ALTER TABLE "fulfillment_provider"
                  DROP CONSTRAINT "FK_store_id_in_fulfillment_provider";
                `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
                  ALTER TABLE "fulfillment_provider"
                  DROP COLUMN "store_id";
                `)
  }
}
