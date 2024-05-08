import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreTheme1714979941291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Create the store_theme table
        await queryRunner.query(`
            CREATE TABLE "store_theme" (
                "id" character varying NOT NULL,
                "name" character varying(255) NOT NULL,
                "store_id" character varying, -- Use character varying for store_id
                "is_published" boolean,
                "serving_type" character varying,
                "archive_path" character varying,
                "serving_path" character varying,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE
            )
        `);

        // Step 2: Add foreign key constraint to link store_id with store table
        await queryRunner.query(`
            ALTER TABLE "store_theme"
            ADD CONSTRAINT "FK_store"
            FOREIGN KEY ("store_id")
            REFERENCES "store" ("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Drop the foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "store_theme"
            DROP CONSTRAINT "FK_store"
        `);

        // Step 2: Drop the store_theme table
        await queryRunner.query(`
            DROP TABLE "store_theme"
        `);
    }

}
