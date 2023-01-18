import {MigrationInterface, QueryRunner} from "typeorm";

export class init1673603398542 implements MigrationInterface {
    name = 'init1673603398542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateddAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE " products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "image" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "brand_id" integer, CONSTRAINT "UQ_3979b9c36c5da8675ca9c20d9a0" UNIQUE ("name"), CONSTRAINT "PK_a0af5a5e9fb50fe26908d020445" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5ebf3b2804cfd42c3e87ec393c" ON " products" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_293d0b9ba5bb8d0f9191f98d7d" ON " products" ("price", "stock") `);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "productId" integer, "orderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "REL_d72eb2a5bbff4f2533a5d4caff" UNIQUE ("customer_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_has_categories" ("product_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_6e625c3bb6bbe74b07411423c8a" PRIMARY KEY ("product_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_902b2a352b06e2b3c387a2e649" ON "products_has_categories" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e832d974c42f6fc3cbc70ace82" ON "products_has_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE " products" ADD CONSTRAINT "FK_528cf12716b11fec0fbb377ef8d" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES " products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_has_categories" ADD CONSTRAINT "FK_902b2a352b06e2b3c387a2e649a" FOREIGN KEY ("product_id") REFERENCES " products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_has_categories" ADD CONSTRAINT "FK_e832d974c42f6fc3cbc70ace82a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_has_categories" DROP CONSTRAINT "FK_e832d974c42f6fc3cbc70ace82a"`);
        await queryRunner.query(`ALTER TABLE "products_has_categories" DROP CONSTRAINT "FK_902b2a352b06e2b3c387a2e649a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE " products" DROP CONSTRAINT "FK_528cf12716b11fec0fbb377ef8d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e832d974c42f6fc3cbc70ace82"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_902b2a352b06e2b3c387a2e649"`);
        await queryRunner.query(`DROP TABLE "products_has_categories"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_293d0b9ba5bb8d0f9191f98d7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ebf3b2804cfd42c3e87ec393c"`);
        await queryRunner.query(`DROP TABLE " products"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "brand"`);
    }

}
