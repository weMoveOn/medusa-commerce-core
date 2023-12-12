import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomerGroupWithStore1702103505939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `ALTER TABLE "customer_group" DROP CONSTRAINT IF EXISTS "IDX_c4c3a5225a7a1f0af782c40abc";`
        );

        await queryRunner.query(
            `ALTER TABLE "customer_group" ADD COLUMN "store_id" character varying(255) NOT NULL;`
        );

        await queryRunner.query(
            `ALTER TABLE "customer_group" ADD CONSTRAINT "FK_store_id_in_customer_group" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION;`
        );

        await queryRunner.query(
            `ALTER TABLE "customer_group" ADD CONSTRAINT "UQ_unique_customer_group_name_and_store_id_handle" UNIQUE ("store_id", "name");`
        );

        await queryRunner.query(`CREATE INDEX "IDX_store_id_in_customer_group" ON "customer_group" ("store_id");`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Drop foreign key constraint
        await queryRunner.query(`
        ALTER TABLE "customer_group" DROP CONSTRAINT "FK_store_id_in_customer_group";
    `);

        // Step 2: Remove the store_id column
        await queryRunner.query(`
        ALTER TABLE "customer_group"
        DROP COLUMN "store_id";
    `);

        // Step 3: Drop unique constraint
        await queryRunner.query(`
        DROP CONSTRAINT "UQ_unique_customer_group_name_and_store_id_handle";
    `);

        // Step 4: Drop index
        await queryRunner.query(`
        DROP INDEX "IDX_store_id_in_customer_group";
    `);
    }

}
