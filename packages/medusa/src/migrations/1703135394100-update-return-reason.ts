import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReturnReason1703135394100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_return_reason_value"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_return_reason_value_with_store_id" ON "return_reason" ("value", "store_id") WHERE deleted_at IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_return_reason_value"`);
    }

}
