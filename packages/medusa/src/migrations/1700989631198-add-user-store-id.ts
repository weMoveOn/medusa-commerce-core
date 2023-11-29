import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUserStoreId1700983753429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "store_id" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_store" FOREIGN KEY ("store_id") REFERENCES "store" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_user_store"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "store_id"`)
  }
}
