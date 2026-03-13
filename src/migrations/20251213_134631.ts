import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '_locales') THEN
        CREATE TYPE "public"."_locales" AS ENUM('ru', 'uz');
    END IF;
END $$;
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
  
  ALTER TABLE "products_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "third_party_access_sessions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "third_party_access_sessions" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_thumbnail_id_media_id_fk";
  
  DROP INDEX "products_thumbnail_idx";
  DROP INDEX "third_party_access_email_idx";
  ALTER TABLE "products_options" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_variants_option_values" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_variants" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_options_locale_idx" ON "products_options" USING btree ("_locale");
  CREATE INDEX "products_variants_option_values_locale_idx" ON "products_variants_option_values" USING btree ("_locale");
  CREATE INDEX "products_variants_locale_idx" ON "products_variants" USING btree ("_locale");
  ALTER TABLE "products" DROP COLUMN "title";
  ALTER TABLE "products" DROP COLUMN "subtitle";
  ALTER TABLE "products" DROP COLUMN "description";
  ALTER TABLE "products" DROP COLUMN "thumbnail_id";
  ALTER TABLE "products" DROP COLUMN "seo_meta_title";
  ALTER TABLE "products" DROP COLUMN "seo_meta_description";
  ALTER TABLE "products" DROP COLUMN "seo_meta_keywords";
  ALTER TABLE "third_party_access" DROP COLUMN "email";
  ALTER TABLE "third_party_access" DROP COLUMN "reset_password_token";
  ALTER TABLE "third_party_access" DROP COLUMN "reset_password_expiration";
  ALTER TABLE "third_party_access" DROP COLUMN "salt";
  ALTER TABLE "third_party_access" DROP COLUMN "hash";
  ALTER TABLE "third_party_access" DROP COLUMN "login_attempts";
  ALTER TABLE "third_party_access" DROP COLUMN "lock_until";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "third_party_access_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  ALTER TABLE "products_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_locales" CASCADE;
  DROP INDEX "products_options_locale_idx";
  DROP INDEX "products_variants_option_values_locale_idx";
  DROP INDEX "products_variants_locale_idx";
  ALTER TABLE "products" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "products" ADD COLUMN "description" jsonb;
  ALTER TABLE "products" ADD COLUMN "thumbnail_id" integer;
  ALTER TABLE "products" ADD COLUMN "seo_meta_title" varchar;
  ALTER TABLE "products" ADD COLUMN "seo_meta_description" varchar;
  ALTER TABLE "products" ADD COLUMN "seo_meta_keywords" varchar;
  ALTER TABLE "third_party_access" ADD COLUMN "email" varchar NOT NULL;
  ALTER TABLE "third_party_access" ADD COLUMN "reset_password_token" varchar;
  ALTER TABLE "third_party_access" ADD COLUMN "reset_password_expiration" timestamp(3) with time zone;
  ALTER TABLE "third_party_access" ADD COLUMN "salt" varchar;
  ALTER TABLE "third_party_access" ADD COLUMN "hash" varchar;
  ALTER TABLE "third_party_access" ADD COLUMN "login_attempts" numeric DEFAULT 0;
  ALTER TABLE "third_party_access" ADD COLUMN "lock_until" timestamp(3) with time zone;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "third_party_access_sessions" ADD CONSTRAINT "third_party_access_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."third_party_access"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE INDEX "third_party_access_sessions_order_idx" ON "third_party_access_sessions" USING btree ("_order");
  CREATE INDEX "third_party_access_sessions_parent_id_idx" ON "third_party_access_sessions" USING btree ("_parent_id");
  ALTER TABLE "products" ADD CONSTRAINT "products_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_thumbnail_idx" ON "products" USING btree ("thumbnail_id");
  CREATE UNIQUE INDEX "third_party_access_email_idx" ON "third_party_access" USING btree ("email");
  ALTER TABLE "products_options" DROP COLUMN "_locale";
  ALTER TABLE "products_variants_option_values" DROP COLUMN "_locale";
  ALTER TABLE "products_variants" DROP COLUMN "_locale";
  DROP TYPE "public"."_locales";`)
}
