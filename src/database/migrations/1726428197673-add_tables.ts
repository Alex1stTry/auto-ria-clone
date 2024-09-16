import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1726428197673 implements MigrationInterface {
    name = 'AddTables1726428197673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "account" text NOT NULL DEFAULT 'base'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "account"`);
    }

}
