import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCities1726761931849 implements MigrationInterface {
    name = 'UpdateCities1726761931849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "city" TO "name"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "account" text NOT NULL DEFAULT 'base'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "name" TO "city"`);
    }

}
