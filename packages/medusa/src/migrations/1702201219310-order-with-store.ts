import { MigrationInterface, QueryRunner } from "typeorm"

export class OrderWithStore1702201219310 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.query(
            `ALTER TABLE "order" ADD COLUMN "store_id" character varying NOT NULL;`
        );

        await queryRunner.query(
            `ALTER TABLE "order" ADD CONSTRAINT "FK_store_id_with_order" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;`
        );

        await queryRunner.query(`CREATE INDEX "IDX_store_id_in_order" ON "order" ("store_id");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_store_id_in_order"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_store_id_with_order"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "store_id"`);
    }

}
