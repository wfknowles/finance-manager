import {MigrationInterface, QueryRunner} from "typeorm";

export class updateInitialSchema1682119243377 implements MigrationInterface {
    name = 'updateInitialSchema1682119243377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "concerns" ADD "order" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "concerns" DROP COLUMN "order"`);
    }

}
