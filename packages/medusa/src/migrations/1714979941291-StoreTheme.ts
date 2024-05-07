import { MigrationInterface, QueryRunner } from "typeorm"

export class StoreTheme1714979941291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE "store_theme" (
        "id" SERIAL PRIMARY KEY,
        "name" character varying(255) NOT NULL,
        "store_id" integer,
        "is_published" boolean,
        "serving_type" character varying,
        "archive_path" character varying,
        "serving_path" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "store_theme"
      ADD CONSTRAINT "FK_store"
      FOREIGN KEY ("store_id")
      REFERENCES "store" ("id")
    `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "store_theme"`);
    }

}
