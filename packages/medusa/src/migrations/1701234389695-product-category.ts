import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductCategory1701234389695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE "product_category" ADD COLUMN "store_id" character varying NOT NULL;
        CREATE INDEX "IDX_product_category_store_id" ON "product_category" ("store_id");
        `)
    queryRunner.query(`
        ALTER TABLE "product_category" ADD CONSTRAINT "FK_product_category_store_id" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE "product_category" DROP CONSTRAINT "FK_product_category_store_id";
        `)
    queryRunner.query(`
        ALTER TABLE "product_category" DROP COLUMN "store_id";
        `)
    //DROP INDEX
    queryRunner.query(`
        DROP INDEX "IDX_product_category_store_id";
        `)
  }
}
