import { MigrationInterface, QueryRunner } from "typeorm"

export class RegionConnectWithStore1701853294672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the sales_channel table
    await queryRunner.query(`
          ALTER TABLE "region"
          ADD COLUMN "store_id" character varying NOT NULL,
          ADD CONSTRAINT "FK_store_id_in_region" 
            FOREIGN KEY ("store_id") REFERENCES "store"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
    
          CREATE INDEX "IDX_store_id_in_region" ON "region" ("store_id");
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
          DROP INDEX "IDX_store_id_in_region";
    
          ALTER TABLE "region"
          DROP CONSTRAINT "FK_store_id_in_region";
        `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
          ALTER TABLE "region"
          DROP COLUMN "store_id";
        `)
  }
}
