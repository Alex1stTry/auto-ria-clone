import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCarPhotos1726694895127 implements MigrationInterface {
    name = 'AddCarPhotos1726694895127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "photos" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "photos"`);
    }

}
