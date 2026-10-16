CREATE TYPE "permission_access" AS ENUM('create', 'read', 'update', 'delete');--> statement-breakpoint
CREATE TABLE "admin_permission" (
	"admin_id" uuid,
	"permission_id" uuid,
	CONSTRAINT "admin_permission_pkey" PRIMARY KEY("admin_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"username" varchar(50) NOT NULL UNIQUE,
	"display_name" varchar(50) NOT NULL,
	"password" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_super" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(25),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" varchar(25),
	"deleted_at" timestamp,
	"deleted_by" varchar(25)
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() UNIQUE,
	"feature_name" varchar(25) NOT NULL,
	"access" "permission_access" DEFAULT 'read'::"permission_access" NOT NULL,
	CONSTRAINT "feature_name_access_unique" UNIQUE("feature_name","access")
);
--> statement-breakpoint
ALTER TABLE "admin_permission" ADD CONSTRAINT "admin_permission_admin_id_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id");--> statement-breakpoint
ALTER TABLE "admin_permission" ADD CONSTRAINT "admin_permission_permission_id_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id");