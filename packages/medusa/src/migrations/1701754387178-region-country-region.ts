import { MigrationInterface, QueryRunner } from "typeorm"

export class RegionCountryRegion1701754387178 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "region_country_region" (
              "region_id" character varying NOT NULL,
              "country_id" integer NOT NULL,
              CONSTRAINT "PK_region_country_region" PRIMARY KEY ("region_id", "country_id"),
              CONSTRAINT "FK_region_id_region_country_region" FOREIGN KEY ("region_id") REFERENCES region("id") ON DELETE CASCADE ON UPDATE NO ACTION,
              CONSTRAINT "FK_country_id_region_country_region" FOREIGN KEY ("country_id") REFERENCES country("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
          `
    )

    await queryRunner.query(
      ` CREATE UNIQUE INDEX "IDX_upcp_region_country_region"
            ON "region_country_region" ("region_id", "country_id")
          `
    )

    await queryRunner.query(
      `CREATE INDEX "IDX_pcp_region_id"
            ON "region_country_region" ("region_id")
          `
    )

    await queryRunner.query(
      `CREATE INDEX "IDX_pcp_country_id"
            ON "region_country_region" ("country_id")
          `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_upcp_region_country_region"`)
    await queryRunner.query(`DROP INDEX "IDX_upcp_region_country_region"`)
    await queryRunner.query(`DROP INDEX "IDX_pcp_region_id"`)
    await queryRunner.query(`DROP TABLE "IDX_pcp_country_id"`)
  }
}
