import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSalesman1726587734934 implements MigrationInterface {
    name = 'UpdateSalesman1726587734934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "car_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" ADD "car_id" uuid`);
    }

}
