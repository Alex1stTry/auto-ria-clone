import { MigrationInterface, QueryRunner } from "typeorm";

export class Rename1726772881123 implements MigrationInterface {
    name = 'Rename1726772881123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "photos" TO "photo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "photo" TO "photos"`);
    }

}
