import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants_option_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants_option_values_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_options" CASCADE;
  DROP TABLE "products_options_locales" CASCADE;
  DROP TABLE "products_variants_option_values" CASCADE;
  DROP TABLE "products_variants_option_values_locales" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  DROP TABLE "products_variants_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_products_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_products_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"medusa_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_options_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants_option_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"medusa_id" varchar NOT NULL,
  	"medusa_option_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants_option_values_locales" (
  	"value" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"medusa_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_variants_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"medusa_id" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "products_options" ADD CONSTRAINT "products_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_options_locales" ADD CONSTRAINT "products_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_option_values" ADD CONSTRAINT "products_variants_option_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_option_values_locales" ADD CONSTRAINT "products_variants_option_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants_option_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants_locales" ADD CONSTRAINT "products_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_options_order_idx" ON "products_options" USING btree ("_order");
  CREATE INDEX "products_options_parent_id_idx" ON "products_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_options_locales_locale_parent_id_unique" ON "products_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_variants_option_values_order_idx" ON "products_variants_option_values" USING btree ("_order");
  CREATE INDEX "products_variants_option_values_parent_id_idx" ON "products_variants_option_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_variants_option_values_locales_locale_parent_id_uni" ON "products_variants_option_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_variants_locales_locale_parent_id_unique" ON "products_variants_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_medusa_id_idx" ON "products" USING btree ("medusa_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");`)
}
