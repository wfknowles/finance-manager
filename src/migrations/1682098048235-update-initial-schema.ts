import {MigrationInterface, QueryRunner} from "typeorm";

export class updateInitialSchema1682098048235 implements MigrationInterface {
    name = 'updateInitialSchema1682098048235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget_items" ADD "amount" numeric(9,2)`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD "canAccrue" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD "accrualMax" numeric(9,2)`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD "label" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD "order" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD "concernId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount" numeric(9,2)`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "detail" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."detail" IS 'Institution provided transaction detail'`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."description" IS 'User provided transaction description'`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "concernId" integer`);
        await queryRunner.query(`ALTER TABLE "concerns" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD CONSTRAINT "FK_c9387ac3e93b00b5ab126e6ad94" FOREIGN KEY ("concernId") REFERENCES "concerns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_eee8cca46ff54ccda16cd30aa24" FOREIGN KEY ("concernId") REFERENCES "concerns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e54745cc015d1e069252c00b842" FOREIGN KEY ("parentId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "concerns" ADD CONSTRAINT "FK_f8736f51895dfd4de79866a94c9" FOREIGN KEY ("parentId") REFERENCES "concerns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "concerns" DROP CONSTRAINT "FK_f8736f51895dfd4de79866a94c9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e54745cc015d1e069252c00b842"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_eee8cca46ff54ccda16cd30aa24"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP CONSTRAINT "FK_c9387ac3e93b00b5ab126e6ad94"`);
        await queryRunner.query(`ALTER TABLE "concerns" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "concernId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "parentId"`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."description" IS 'User provided transaction description'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "description"`);
        await queryRunner.query(`COMMENT ON COLUMN "transactions"."detail" IS 'Institution provided transaction detail'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "detail"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP COLUMN "concernId"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP COLUMN "accrualMax"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP COLUMN "canAccrue"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP COLUMN "amount"`);
    }

}
