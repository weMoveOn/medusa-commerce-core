import { MigrationInterface, QueryRunner } from "typeorm"

export class DiscoutConnectWithStore1702371700842
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the tracking_link table
    await queryRunner.query(`
                      ALTER TABLE "discount"
                      ADD COLUMN "store_id" character varying NOT NULL,
                      ADD CONSTRAINT "FK_store_id_in_discount" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

                      CREATE INDEX "IDX_store_id_in_discount" ON "discount" ("store_id");
                    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
                      DROP INDEX "IDX_store_id_in_discount";
                      
                      ALTER TABLE "discount"
                      DROP CONSTRAINT "FK_store_id_in_discount";
                    `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
                      ALTER TABLE "discount"
                      DROP COLUMN "store_id";
                    `)
  }
}
