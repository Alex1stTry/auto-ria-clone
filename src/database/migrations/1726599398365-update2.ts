import { MigrationInterface, QueryRunner } from "typeorm";

export class Update21726599398365 implements MigrationInterface {
    name = 'Update21726599398365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "city_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9a82ca21264c28db00ade236f05" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9a82ca21264c28db00ade236f05"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "city_id"`);
    }

}
