import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSchema1682116943622 implements MigrationInterface {
    name = 'initialSchema1682116943622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "budgets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "accountId" integer, CONSTRAINT "PK_9c8a51748f82387644b773da482" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "institutions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "accountId" integer, CONSTRAINT "PK_0be7539dcdba335470dc05e9690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "date" date NOT NULL, "amount" numeric(9,2), "detail" character varying NOT NULL, "description" character varying, "parentId" integer, "accountId" integer, "concernId" integer, "institutionId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")); COMMENT ON COLUMN "transactions"."detail" IS 'Institution provided transaction detail'; COMMENT ON COLUMN "transactions"."description" IS 'User provided transaction description'`);
        await queryRunner.query(`CREATE TABLE "concerns" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "parentId" integer, "accountId" integer, CONSTRAINT "PK_743844335346f7379d1fc28950a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget_items" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "amount" numeric(9,2) NOT NULL, "canAccrue" boolean NOT NULL, "accrualMax" numeric(9,2), "label" character varying, "order" integer, "accountId" integer, "budgetId" integer, "concernId" integer, CONSTRAINT "PK_9eb705f406c83a1167ef575cd7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "accountId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_744697fee7edfaa490e40a92684" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "institutions" ADD CONSTRAINT "FK_8adc781e8e6430614d2b6f280bd" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_eee8cca46ff54ccda16cd30aa24" FOREIGN KEY ("concernId") REFERENCES "concerns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_712eec9703fd8454fd4628e3960" FOREIGN KEY ("institutionId") REFERENCES "institutions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e54745cc015d1e069252c00b842" FOREIGN KEY ("parentId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "concerns" ADD CONSTRAINT "FK_7315628dd9c0aa35181e61e0ecf" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "concerns" ADD CONSTRAINT "FK_f8736f51895dfd4de79866a94c9" FOREIGN KEY ("parentId") REFERENCES "concerns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD CONSTRAINT "FK_23bdbcb2cd2858cd4d708323032" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD CONSTRAINT "FK_1160fb85bb3cb492ac954b491a9" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_items" ADD CONSTRAINT "FK_c9387ac3e93b00b5ab126e6ad94" FOREIGN KEY ("concernId") REFERENCES "concerns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP CONSTRAINT "FK_c9387ac3e93b00b5ab126e6ad94"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP CONSTRAINT "FK_1160fb85bb3cb492ac954b491a9"`);
        await queryRunner.query(`ALTER TABLE "budget_items" DROP CONSTRAINT "FK_23bdbcb2cd2858cd4d708323032"`);
        await queryRunner.query(`ALTER TABLE "concerns" DROP CONSTRAINT "FK_f8736f51895dfd4de79866a94c9"`);
        await queryRunner.query(`ALTER TABLE "concerns" DROP CONSTRAINT "FK_7315628dd9c0aa35181e61e0ecf"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e54745cc015d1e069252c00b842"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_712eec9703fd8454fd4628e3960"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_eee8cca46ff54ccda16cd30aa24"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"`);
        await queryRunner.query(`ALTER TABLE "institutions" DROP CONSTRAINT "FK_8adc781e8e6430614d2b6f280bd"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_744697fee7edfaa490e40a92684"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "budget_items"`);
        await queryRunner.query(`DROP TABLE "concerns"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "institutions"`);
        await queryRunner.query(`DROP TABLE "budgets"`);
    }

}
