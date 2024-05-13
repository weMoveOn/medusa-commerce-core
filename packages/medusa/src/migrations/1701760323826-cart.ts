import { MigrationInterface, QueryRunner } from "typeorm";

export class Cart1701760323826 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Add store_id column to the cart table
        await queryRunner.query(`
      ALTER TABLE "cart"
      ADD COLUMN "store_id" character varying NOT NULL,
      ADD CONSTRAINT "FK_store_id_in_cart"
        FOREIGN KEY ("store_id") REFERENCES "store"("id")
        ON DELETE CASCADE
        ON UPDATE NO ACTION;

      CREATE INDEX "IDX_store_id_in_cart" ON "cart" ("store_id");
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Drop foreign key constraint and index
        await queryRunner.query(`
      DROP INDEX "IDX_store_id_in_cart";

      ALTER TABLE "cart"
      DROP CONSTRAINT "FK_store_id_in_cart";
    `);

        // Step 2: Remove the store_id column
        await queryRunner.query(`
      ALTER TABLE "cart"
      DROP COLUMN "store_id";
    `);
    }
}
