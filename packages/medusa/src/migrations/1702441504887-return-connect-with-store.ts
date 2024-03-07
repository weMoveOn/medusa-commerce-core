import { MigrationInterface, QueryRunner } from "typeorm"

export class ReturnConnectWithStore1702441504887 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "return" ADD "store_id" character varying NOT NULL`)
        await queryRunner.query(`ALTER TABLE "return" ADD CONSTRAINT "FK_FOR_RETURN_2a9c3d6a7f5c9b6d8e7b6d8e7b6" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`)
        await queryRunner.query(`CREATE INDEX "IDX_FOR_RETURN_IDX_2a9c3d6a7f5c9b6d8e7b6d8e7b" ON "return" ("store_id")`)



    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_FOR_RETURN_IDX_2a9c3d6a7f5c9b6d8e7b6d8e7b"`)
        await queryRunner.query(`ALTER TABLE "return" DROP CONSTRAINT "FK_FOR_RETURN_2a9c3d6a7f5c9b6d8e7b6d8e7b6"`)
        await queryRunner.query(`ALTER TABLE "return" DROP COLUMN "store_id"`)
    }

}
