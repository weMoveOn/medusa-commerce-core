import { MigrationInterface, QueryRunner } from "typeorm"

export class ImageConnectWithStore1702094073141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the image table
    await queryRunner.query(`
      ALTER TABLE "image"
      ADD COLUMN "store_id" character varying NOT NULL,
      ADD CONSTRAINT "FK_store_id_in_image" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
      
      CREATE INDEX "IDX_store_id_in_image" ON "image" ("store_id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
      DROP INDEX "IDX_store_id_in_image";
      
      ALTER TABLE "image"
      DROP CONSTRAINT "FK_store_id_in_image";
    `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
      ALTER TABLE "image"
      DROP COLUMN "store_id";
    `)
  }
}
