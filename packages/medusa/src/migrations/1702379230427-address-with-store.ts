import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressWithStore1702379230427 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "address" ADD COLUMN "store_id" character varying NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "address" ADD CONSTRAINT "FK_store_id_in_address" FOREIGN KEY ("store_id") REFERENCES "store" ("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "address" DROP CONSTRAINT "FK_store_id_in_address"`
        );
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "store_id"`);
    }
}
