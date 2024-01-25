import { MigrationInterface, QueryRunner } from "typeorm"

export class DraftOrderWithStoreId1702976504988 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //modify store_id column set to it NOT NULL
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
