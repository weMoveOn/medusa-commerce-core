import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminBuilder1714763786624 implements MigrationInterface {
    name = 'AdminBuilder1714763786624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_builder" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "property_id" character varying, "type" character varying, "value" character varying, CONSTRAINT "PK_8c95c4fd1c4b0be92d6fda50ac5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af3ecb6b0333ed80b435c2a0d5" ON "admin_builder" ("property_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_af3ecb6b0333ed80b435c2a0d5"`);
        await queryRunner.query(`DROP TABLE "admin_builder"`);
    }

}
