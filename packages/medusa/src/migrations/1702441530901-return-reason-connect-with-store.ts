import { MigrationInterface, QueryRunner } from "typeorm"

export class ReturnReasonConnectWithStore1702441530901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "return_reason" ADD "store_id" character varying NOT NULL`)
        await queryRunner.query(`ALTER TABLE "return_reason" ADD CONSTRAINT "FK_4f3a9e5b0c5c0d6f4f2b5e4c0f6" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`)
        await queryRunner.query(`CREATE INDEX "IDX_4f3a9e5b0c5c0d6f4f2b5e4c0f" ON "return_reason" ("store_id")`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_4f3a9e5b0c5c0d6f4f2b5e4c0f"`)
        await queryRunner.query(`ALTER TABLE "return_reason" DROP CONSTRAINT "FK_4f3a9e5b0c5c0d6f4f2b5e4c0f6"`)
        await queryRunner.query(`ALTER TABLE "return_reason" DROP COLUMN "store_id"`)
    }

}
