import { MigrationInterface, QueryRunner } from "typeorm"

export class TextRateConnectWithStore1702210666871
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the sales_channel table
    await queryRunner.query(`
                                  ALTER TABLE "tax_rate"
                                  ADD COLUMN "store_id" character varying NOT NULL,
                                  ADD CONSTRAINT "FK_store_id_in_tax_rate" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
                    
                                  CREATE INDEX "IDX_store_id_in_tax_rate" ON "tax_rate" ("store_id");
                                `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
                                  DROP INDEX "IDX_store_id_in_tax_rate";
                            
                                  ALTER TABLE "tax_rate"
                                  DROP CONSTRAINT "FK_store_id_in_tax_rate";
                                `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
                                  ALTER TABLE "tax_rate"
                                  DROP COLUMN "store_id";
                                `)
  }
}
