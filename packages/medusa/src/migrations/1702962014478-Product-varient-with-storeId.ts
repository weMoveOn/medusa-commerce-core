import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductVarientWithStoreId1702962014478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "store_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD CONSTRAINT "FK_store_id_with_product_variant" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE INDEX "IDX_store_id_with_product_variant" ON "product_variant" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_store_id_with_product_variant"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_store_id_with_product_variant"`);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "store_id"`);
    }

}
