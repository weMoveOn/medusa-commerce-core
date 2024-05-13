import { MigrationInterface, QueryRunner } from "typeorm"

export class ShippingProfileConnectWithStore1702203262487
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the shipping_profile table
    await queryRunner.query(`
      ALTER TABLE "shipping_profile"
      ADD COLUMN "store_id" character varying NOT NULL,
      ADD CONSTRAINT "FK_store_id_in_shipping_profile" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
      
      CREATE INDEX "IDX_store_id_in_shipping_profile" ON "shipping_profile" ("store_id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
      DROP INDEX "IDX_store_id_in_shipping_profile";
      
      ALTER TABLE "shipping_profile"
      DROP CONSTRAINT "FK_store_id_in_shipping_profile";
    `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
      ALTER TABLE "shipping_profile"
      DROP COLUMN "store_id";
    `)
  }
}
