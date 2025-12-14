import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_options_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants_option_values_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP INDEX "products_options_locale_idx";
  DROP INDEX "products_variants_option_values_locale_idx";
  DROP INDEX "products_variants_locale_idx";
  ALTER TABLE "products_options_locales" ADD CONSTRAINT "products_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_option_values_locales" ADD CONSTRAINT "products_variants_option_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants_option_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_locales" ADD CONSTRAINT "products_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "products_options_locales_locale_parent_id_unique" ON "products_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_variants_option_values_locales_locale_parent_id_uni" ON "products_variants_option_values_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_variants_locales_locale_parent_id_unique" ON "products_variants_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "products_options" DROP COLUMN "_locale";
  ALTER TABLE "products_options" DROP COLUMN "title";
  ALTER TABLE "products_variants_option_values" DROP COLUMN "_locale";
  ALTER TABLE "products_variants_option_values" DROP COLUMN "value";
  ALTER TABLE "products_variants" DROP COLUMN "_locale";
  ALTER TABLE "products_variants" DROP COLUMN "title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants_option_values_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_options_locales" CASCADE;
  DROP TABLE "products_variants_option_values_locales" CASCADE;
  DROP TABLE "products_variants_locales" CASCADE;
  ALTER TABLE "products_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_options" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products_variants_option_values" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_variants_option_values" ADD COLUMN "value" varchar NOT NULL;
  ALTER TABLE "products_variants" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_variants" ADD COLUMN "title" varchar NOT NULL;
  CREATE INDEX "products_options_locale_idx" ON "products_options" USING btree ("_locale");
  CREATE INDEX "products_variants_option_values_locale_idx" ON "products_variants_option_values" USING btree ("_locale");
  CREATE INDEX "products_variants_locale_idx" ON "products_variants" USING btree ("_locale");`)
}
