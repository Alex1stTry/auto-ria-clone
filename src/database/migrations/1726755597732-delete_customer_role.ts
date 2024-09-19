import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCustomerRole1726755597732 implements MigrationInterface {
    name = 'DeleteCustomerRole1726755597732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "account"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "account" text NOT NULL DEFAULT 'base'`);
    }

}
