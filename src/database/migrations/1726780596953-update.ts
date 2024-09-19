import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1726780596953 implements MigrationInterface {
    name = 'Update1726780596953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "photo" TO "photos"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" RENAME COLUMN "photos" TO "photo"`);
    }

}
