import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "featured_brands_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "featured_brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "featured_brands_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "brand_section_brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brand_section_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "brand_section_brands" CASCADE;
  DROP TABLE "brand_section" CASCADE;
  DROP TABLE "brand_section_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_brand_section_fk";
  
  DROP INDEX "payload_locked_documents_rels_brand_section_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "featured_brands_id" integer;
  ALTER TABLE "featured_brands_brands" ADD CONSTRAINT "featured_brands_brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_brands_brands" ADD CONSTRAINT "featured_brands_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."featured_brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "featured_brands_locales" ADD CONSTRAINT "featured_brands_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."featured_brands"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "featured_brands_brands_order_idx" ON "featured_brands_brands" USING btree ("_order");
  CREATE INDEX "featured_brands_brands_parent_id_idx" ON "featured_brands_brands" USING btree ("_parent_id");
  CREATE INDEX "featured_brands_brands_logo_idx" ON "featured_brands_brands" USING btree ("logo_id");
  CREATE INDEX "featured_brands_updated_at_idx" ON "featured_brands" USING btree ("updated_at");
  CREATE INDEX "featured_brands_created_at_idx" ON "featured_brands" USING btree ("created_at");
  CREATE UNIQUE INDEX "featured_brands_locales_locale_parent_id_unique" ON "featured_brands_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_featured_brands_fk" FOREIGN KEY ("featured_brands_id") REFERENCES "public"."featured_brands"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_featured_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("featured_brands_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "brand_section_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "brand_section_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "brand_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "brand_section_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "featured_brands_brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_brands_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "featured_brands_brands" CASCADE;
  DROP TABLE "featured_brands" CASCADE;
  DROP TABLE "featured_brands_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_featured_brands_fk";
  
  DROP INDEX "payload_locked_documents_rels_featured_brands_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "brand_section_id" integer;
  ALTER TABLE "brand_section_brands" ADD CONSTRAINT "brand_section_brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brand_section_brands" ADD CONSTRAINT "brand_section_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brand_section_locales" ADD CONSTRAINT "brand_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "brand_section_brands_order_idx" ON "brand_section_brands" USING btree ("_order");
  CREATE INDEX "brand_section_brands_parent_id_idx" ON "brand_section_brands" USING btree ("_parent_id");
  CREATE INDEX "brand_section_brands_logo_idx" ON "brand_section_brands" USING btree ("logo_id");
  CREATE INDEX "brand_section_updated_at_idx" ON "brand_section" USING btree ("updated_at");
  CREATE INDEX "brand_section_created_at_idx" ON "brand_section" USING btree ("created_at");
  CREATE UNIQUE INDEX "brand_section_locales_locale_parent_id_unique" ON "brand_section_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brand_section_fk" FOREIGN KEY ("brand_section_id") REFERENCES "public"."brand_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_brand_section_id_idx" ON "payload_locked_documents_rels" USING btree ("brand_section_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "featured_brands_id";`)
}
