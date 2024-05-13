import { MigrationInterface, QueryRunner } from "typeorm";

export class DiscoutConnectWithStore1702371700842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the discount table
    await queryRunner.query(`
            ALTER TABLE "discount"
            ADD COLUMN "store_id" character varying NOT NULL;

            ALTER TABLE "discount"
            ADD CONSTRAINT "FK_store_id_in_discount" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

            ALTER TABLE "discount"
            ADD CONSTRAINT "UQ_unique_discount_and_store_id_handle" UNIQUE ("store_id", "code");

            CREATE INDEX "IDX_store_id_in_discount" ON "discount" ("store_id");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop the unique constraint and index
    await queryRunner.query(`
            ALTER TABLE "discount"
            DROP CONSTRAINT "UQ_unique_discount_and_store_id_handle";

            DROP INDEX "IDX_store_id_in_discount";
        `);

    // Step 2: Drop the foreign key constraint
    await queryRunner.query(`
            ALTER TABLE "discount"
            DROP CONSTRAINT "FK_store_id_in_discount";
        `);

    // Step 3: Remove the store_id column
    await queryRunner.query(`
            ALTER TABLE "discount"
            DROP COLUMN "store_id";
        `);
  }
}
