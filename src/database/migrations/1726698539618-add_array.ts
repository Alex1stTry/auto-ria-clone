import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArray1726698539618 implements MigrationInterface {
    name = 'AddArray1726698539618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "photos"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "photos" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "photos"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "photos" text`);
    }

}
