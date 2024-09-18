import { MigrationInterface, QueryRunner } from "typeorm";

export class AddModelBrand1726663525642 implements MigrationInterface {
    name = 'AddModelBrand1726663525642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "brand_id" uuid, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "brand_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "model_id " uuid`);
        await queryRunner.query(`ALTER TABLE "model" ADD CONSTRAINT "FK_1c9fa70a2a9da326c507e3fead5" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_68ce82c97c062f06685a52b3d60" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_99af37ae7be3c60e7a59ff97867" FOREIGN KEY ("model_id ") REFERENCES "model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_99af37ae7be3c60e7a59ff97867"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_68ce82c97c062f06685a52b3d60"`);
        await queryRunner.query(`ALTER TABLE "model" DROP CONSTRAINT "FK_1c9fa70a2a9da326c507e3fead5"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "model_id "`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "brand_id"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "model" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "brand" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "model"`);
    }

}
