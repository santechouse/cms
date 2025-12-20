import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "brand_section_brands_locales" CASCADE;
  ALTER TABLE "brand_section_brands" ADD COLUMN "name" varchar NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "brand_section_brands_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "brand_section_brands_locales" ADD CONSTRAINT "brand_section_brands_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brand_section_brands"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "brand_section_brands_locales_locale_parent_id_unique" ON "brand_section_brands_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "brand_section_brands" DROP COLUMN "name";`)
}
