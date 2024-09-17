import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSome1726603125594 implements MigrationInterface {
    name = 'AddSome1726603125594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b570e59cdf7538e576fe22a045f"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "salesman_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b570e59cdf7538e576fe22a045f" FOREIGN KEY ("salesman_id") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b570e59cdf7538e576fe22a045f"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "salesman_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b570e59cdf7538e576fe22a045f" FOREIGN KEY ("salesman_id") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
