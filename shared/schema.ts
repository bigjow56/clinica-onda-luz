import { pgTable, text, varchar, integer, boolean, timestamp, date, time, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Admin users table (for authentication)
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // hashed password
  role: text("role").default("admin").$type<"admin" | "super_admin">(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Site settings table
export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  siteName: text("site_name").notNull().default("DentalCare"),
  heroTitle: text("hero_title").notNull().default("Seu sorriso é nossa prioridade"),
  heroDescription: text("hero_description").notNull().default("Oferecemos cuidados odontológicos modernos e personalizados para toda a família. Tecnologia avançada e atendimento humanizado."),
  heroImageUrl: text("hero_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Team members table
export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  experienceYears: integer("experience_years").notNull(),
  credentials: text("credentials").notNull(),
  imageUrl: text("image_url"),
  specialties: text("specialties").array().default(sql`'{}'`),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Appointments table
export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  patientName: text("patient_name").notNull(),
  patientEmail: text("patient_email").notNull(),
  patientPhone: text("patient_phone").notNull(),
  preferredDate: date("preferred_date").notNull(),
  preferredTime: time("preferred_time").notNull(),
  serviceType: text("service_type").notNull(),
  message: text("message"),
  status: text("status").default("pending").$type<"pending" | "confirmed" | "cancelled" | "completed">(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Schema validation
export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  email: true,
  password: true,
  role: true,
});

export const selectAdminUserSchema = createSelectSchema(adminUsers).omit({
  password: true, // Never select password in responses
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings);
export const updateSiteSettingsSchema = insertSiteSettingsSchema.partial();

export const insertTeamMemberSchema = createInsertSchema(teamMembers);
export const updateTeamMemberSchema = insertTeamMemberSchema.partial();

export const insertAppointmentSchema = createInsertSchema(appointments);
export const updateAppointmentSchema = insertAppointmentSchema.partial();

// Types
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = z.infer<typeof selectAdminUserSchema>;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
