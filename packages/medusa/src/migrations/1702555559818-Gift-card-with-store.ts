import { MigrationInterface, QueryRunner } from "typeorm"

export class GiftCardWithStore1702555559818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gift_card" ADD COLUMN "store_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gift_card" ADD CONSTRAINT "FK_gift_card_with_store_id" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE INDEX "IDX_gift_card_with_store_id" ON "gift_card" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_gift_card_with_store_id"`);
        await queryRunner.query(`ALTER TABLE "gift_card" DROP CONSTRAINT "FK_gift_card_with_store_id"`);
        await queryRunner.query(`ALTER TABLE "gift_card" DROP COLUMN "store_id"`);
    }

}
