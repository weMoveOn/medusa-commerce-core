import { MigrationInterface, QueryRunner } from "typeorm"

export class InviteConnectWithStore1702272700850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the invite table
    await queryRunner.query(`
      ALTER TABLE "invite"
      ADD COLUMN "store_id" character varying NOT NULL,
      ADD CONSTRAINT "FK_store_id_in_invite" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
      
      CREATE INDEX "IDX_store_id_in_invite" ON "invite" ("store_id");
    `)

    await queryRunner.query(`
      ALTER TABLE "invite"
      ADD CONSTRAINT "UQ_user_email_store_id" UNIQUE ("user_email", "store_id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
      DROP INDEX "IDX_store_id_in_invite";
      
      ALTER TABLE "invite"
      DROP CONSTRAINT "FK_store_id_in_invite";

      ALTER TABLE "invite"
      DROP CONSTRAINT "UQ_user_email_store_id";
    `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
      ALTER TABLE "invite"
      DROP COLUMN "store_id";
    `)
  }
}
