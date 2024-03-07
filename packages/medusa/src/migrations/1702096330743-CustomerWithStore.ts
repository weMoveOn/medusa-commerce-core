import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomerWithStore1702096330743 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `ALTER TABLE "customer" DROP CONSTRAINT IF EXISTS "UQ_unique_email_for_guests_and_customer_accounts";`
        );

        await queryRunner.query(
            `ALTER TABLE "customer" ADD COLUMN "store_id" character varying(255) NOT NULL;`
        );

        await queryRunner.query(
            `ALTER TABLE "customer" ADD CONSTRAINT "FK_store_id_in_customer" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;`
        );

        await queryRunner.query(
            `ALTER TABLE "customer" ADD CONSTRAINT "UQ_unique_customer_email_and_store_id_handle" UNIQUE ("store_id", "email");`
        );

        await queryRunner.query(`CREATE INDEX "IDX_store_id_in_customer" ON "customer" ("store_id");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Drop foreign key constraint
        await queryRunner.query(`
        ALTER TABLE "customer" DROP CONSTRAINT "FK_store_id_in_customer";
    `);

        // Step 2: Remove the store_id column
        await queryRunner.query(`
        ALTER TABLE "customer"
        DROP COLUMN "store_id";
    `);

        // Step 3: Drop unique constraint
        await queryRunner.query(`
        DROP CONSTRAINT "UQ_unique_customer_email_and_store_id_handle";
    `);

        // Step 4: Drop index
        await queryRunner.query(`
        DROP INDEX "IDX_store_id_in_customer";
    `);
    }

}
