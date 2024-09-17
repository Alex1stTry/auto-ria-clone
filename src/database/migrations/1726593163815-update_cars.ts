import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCars1726593163815 implements MigrationInterface {
    name = 'UpdateCars1726593163815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9a82ca21264c28db00ade236f05"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b570e59cdf7538e576fe22a045f"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "city_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "salesman_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9a82ca21264c28db00ade236f05" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b570e59cdf7538e576fe22a045f" FOREIGN KEY ("salesman_id") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b570e59cdf7538e576fe22a045f"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9a82ca21264c28db00ade236f05"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "salesman_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "city_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b570e59cdf7538e576fe22a045f" FOREIGN KEY ("salesman_id") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9a82ca21264c28db00ade236f05" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
