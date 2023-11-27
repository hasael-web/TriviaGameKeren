import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1700795751252 implements MigrationInterface {
    name = 'MyMigration1700795751252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "diamond" integer NOT NULL DEFAULT '0', "totalPoints" integer NOT NULL DEFAULT '0', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "avatarIdId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Avatar" ("id" SERIAL NOT NULL, "img_src" character varying NOT NULL, "price" double precision, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b290694756008c06fc0ee5d0c2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_item_detail" ("id" SERIAL NOT NULL, "id_item" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "price" numeric NOT NULL, "quantity" integer NOT NULL, "brand" character varying(255) NOT NULL, "category" character varying(255) NOT NULL, "merchant_name" character varying(255) NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" integer, CONSTRAINT "PK_711e27417afb09bdddf78529107" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_order" ("id" SERIAL NOT NULL, "order_id" character varying(255) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(15) NOT NULL, "status" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7fc0e9648e97e4bebb340dc9f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f9053cc87d5bb754cbc6f619537" FOREIGN KEY ("avatarIdId") REFERENCES "Avatar"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_item_detail" ADD CONSTRAINT "FK_5ebac4cced444fe1b1aab17da9f" FOREIGN KEY ("userIdId") REFERENCES "user_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_07fdceb951447b243a431fb8256" FOREIGN KEY ("userIdId") REFERENCES "user_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_07fdceb951447b243a431fb8256"`);
        await queryRunner.query(`ALTER TABLE "user_item_detail" DROP CONSTRAINT "FK_5ebac4cced444fe1b1aab17da9f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f9053cc87d5bb754cbc6f619537"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "user_order"`);
        await queryRunner.query(`DROP TABLE "user_item_detail"`);
        await queryRunner.query(`DROP TABLE "Avatar"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
