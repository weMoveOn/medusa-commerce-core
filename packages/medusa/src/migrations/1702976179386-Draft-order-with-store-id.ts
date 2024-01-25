import { MigrationInterface, QueryRunner } from "typeorm"

export class DraftOrderWithStoreId1702976179386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "draft_order" ADD "store_id" character varying`);
        await queryRunner.query(`ALTER TABLE "draft_order" ADD CONSTRAINT "FK_draft_order_with_store_id" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE INDEX "IDX_draft_order_store_id" ON "draft_order" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_draft_order_store_id"`);
        await queryRunner.query(`ALTER TABLE "draft_order" DROP CONSTRAINT "FK_draft_order_with_store_id"`);
        await queryRunner.query(`ALTER TABLE "draft_order" DROP COLUMN "store_id"`);
    }

}
