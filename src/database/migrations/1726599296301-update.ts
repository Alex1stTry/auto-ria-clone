import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1726599296301 implements MigrationInterface {
    name = 'Update1726599296301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9a82ca21264c28db00ade236f05"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "city_id"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "PK_2cea114a4d9e4edb1a69d4eb079"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "city_id"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "updated"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "city_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "PK_2cea114a4d9e4edb1a69d4eb079" PRIMARY KEY ("city_id")`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "city_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9a82ca21264c28db00ade236f05" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
