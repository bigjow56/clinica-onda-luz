CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'admin',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_name" text NOT NULL,
	"patient_email" text NOT NULL,
	"patient_phone" text NOT NULL,
	"preferred_date" date NOT NULL,
	"preferred_time" time NOT NULL,
	"service_type" text NOT NULL,
	"message" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site_name" text DEFAULT 'DentalCare' NOT NULL,
	"hero_title" text DEFAULT 'Seu sorriso é nossa prioridade' NOT NULL,
	"hero_description" text DEFAULT 'Oferecemos cuidados odontológicos modernos e personalizados para toda a família. Tecnologia avançada e atendimento humanizado.' NOT NULL,
	"hero_image_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"specialty" text NOT NULL,
	"experience_years" integer NOT NULL,
	"credentials" text NOT NULL,
	"image_url" text,
	"specialties" text[] DEFAULT '{}',
	"display_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
