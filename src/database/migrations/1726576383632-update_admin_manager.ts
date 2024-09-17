import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAdminManager1726576383632 implements MigrationInterface {
    name = 'UpdateAdminManager1726576383632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "token_id" uuid`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_d9dd49fbfbc51858ec09b262b82" UNIQUE ("token_id")`);
        await queryRunner.query(`ALTER TABLE "manager" ADD "token_id" uuid`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "UQ_41a8271555605aafdd8842fb523" UNIQUE ("token_id")`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_d9dd49fbfbc51858ec09b262b82" FOREIGN KEY ("token_id") REFERENCES "refresh_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_41a8271555605aafdd8842fb523" FOREIGN KEY ("token_id") REFERENCES "refresh_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_41a8271555605aafdd8842fb523"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_d9dd49fbfbc51858ec09b262b82"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "UQ_41a8271555605aafdd8842fb523"`);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "token_id"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_d9dd49fbfbc51858ec09b262b82"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "token_id"`);
    }

}
