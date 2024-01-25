import { MigrationInterface, QueryRunner } from "typeorm"

export class AnalyticsConfigWithStore1703067160427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "analytics_config" ADD COLUMN "store_id" character varying NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "analytics_config" ADD CONSTRAINT "FK_analytics_config_with_store_id" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "analytics_config" DROP CONSTRAINT "FK_analytics_config_with_store_id"`
        )
        await queryRunner.query(
            `ALTER TABLE "analytics_config" DROP COLUMN "store_id"`
        )

    }

}
