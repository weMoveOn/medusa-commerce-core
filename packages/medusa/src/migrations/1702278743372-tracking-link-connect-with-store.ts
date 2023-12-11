import { MigrationInterface, QueryRunner } from "typeorm"

export class TrackingLinkConnectWithStore1702278743372
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add store_id column to the sales_channel table
    await queryRunner.query(`
                                          ALTER TABLE "tracking_link"
                                          ADD COLUMN "store_id" character varying NOT NULL,
                                          ADD CONSTRAINT "FK_store_id_in_tracking_link" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
                            
                                          CREATE INDEX "IDX_store_id_in_tracking_link" ON "tracking_link" ("store_id");
                                        `)
                                   
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Drop foreign key constraint and index
    await queryRunner.query(`
                                          DROP INDEX "IDX_store_id_in_tracking_link";
                                    
                                          ALTER TABLE "tracking_link"
                                          DROP CONSTRAINT "FK_store_id_in_tracking_link";
                                          ALTER TABLE "tracking_link"
                                          DROP CONSTRAINT "UQ_user_email_store_id";
                                        `)

    // Step 2: Remove the store_id column
    await queryRunner.query(`
                                          ALTER TABLE "tracking_link"
                                          DROP COLUMN "store_id";
                                        `)
  }
}
