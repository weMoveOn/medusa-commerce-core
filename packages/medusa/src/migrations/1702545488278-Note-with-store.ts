import { MigrationInterface, QueryRunner } from "typeorm"

export class NoteWithStore1702545488278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ADD COLUMN "store_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_note_with_store_id" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE INDEX "IDX_note_with_store_id" ON "note" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_note_with_store_id"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_note_with_store_id"`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "store_id"`);
    }

}
