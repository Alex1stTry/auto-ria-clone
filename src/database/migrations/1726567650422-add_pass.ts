import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPass1726567650422 implements MigrationInterface {
    name = 'AddPass1726567650422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "password" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "password"`);
    }

}
