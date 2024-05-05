
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminBuilderTable1623688685319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS admin_builder (
                id VARCHAR(255) PRIMARY KEY,
                type VARCHAR(255) NOT NULL,
                value VARCHAR(255) NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS admin_builder");
  }
}
