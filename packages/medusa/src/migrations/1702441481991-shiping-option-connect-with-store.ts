import { MigrationInterface, QueryRunner } from "typeorm"

export class ShipingOptionConnectWithStore1702441481991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_option" ADD "store_id" character varying NOT NULL`)
        await queryRunner.query(`ALTER TABLE "shipping_option" ADD CONSTRAINT "FK_2a9c3d6a7f5c9b6d8e7b6d8e7b6" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`)
        await queryRunner.query(`CREATE INDEX "IDX_2a9c3d6a7f5c9b6d8e7b6d8e7b" ON "shipping_option" ("store_id")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2a9c3d6a7f5c9b6d8e7b6d8e7b"`)
        await queryRunner.query(`ALTER TABLE "shipping_option" DROP CONSTRAINT "FK_2a9c3d6a7f5c9b6d8e7b6d8e7b6"`)
        await queryRunner.query(`ALTER TABLE "shipping_option" DROP COLUMN "store_id"`)
    }

}
