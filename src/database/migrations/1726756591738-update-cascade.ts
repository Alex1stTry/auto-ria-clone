import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascade1726756591738 implements MigrationInterface {
    name = 'UpdateCascade1726756591738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3bd3c334aeafca92326562bcb7f"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_12a025ac183513a2688c77cef43"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3bd3c334aeafca92326562bcb7f" FOREIGN KEY ("salesman_id") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_12a025ac183513a2688c77cef43" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_12a025ac183513a2688c77cef43"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3bd3c334aeafca92326562bcb7f"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_12a025ac183513a2688c77cef43" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3bd3c334aeafca92326562bcb7f" FOREIGN KEY ("salesman_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
