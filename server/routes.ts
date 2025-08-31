import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { adminUsers } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";
const SALT_ROUNDS = 10;

// Middleware to check if user is authenticated admin
const authenticateAdmin = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await storage.getAdminUser(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await storage.getAdminUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Get user with password for verification
      const userWithPassword = await db.select().from(adminUsers).where(
        eq(adminUsers.email, email)
      );
      
      if (!userWithPassword[0]) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, userWithPassword[0].password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error("Sign in error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, role = "admin" } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getAdminUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await storage.createAdminUser({
        email,
        password: hashedPassword,
        role
      });

      res.json({ user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      console.error("Sign up error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/auth/me", authenticateAdmin, async (req, res) => {
    res.json({ user: req.user });
  });

  // Site settings routes
  app.get("/api/site-settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error("Get site settings error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/site-settings", authenticateAdmin, async (req, res) => {
    try {
      const settings = await storage.updateSiteSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error("Update site settings error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Team members routes
  app.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getTeamMembers();
      res.json(members);
    } catch (error) {
      console.error("Get team members error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/team-members/:id", async (req, res) => {
    try {
      const member = await storage.getTeamMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Get team member error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/team-members", authenticateAdmin, async (req, res) => {
    try {
      const member = await storage.createTeamMember(req.body);
      res.json(member);
    } catch (error) {
      console.error("Create team member error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/team-members/:id", authenticateAdmin, async (req, res) => {
    try {
      const member = await storage.updateTeamMember(req.params.id, req.body);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Update team member error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/team-members/:id", authenticateAdmin, async (req, res) => {
    try {
      const success = await storage.deleteTeamMember(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete team member error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Appointments routes
  app.get("/api/appointments", authenticateAdmin, async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      console.error("Get appointments error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const appointment = await storage.createAppointment(req.body);
      res.json(appointment);
    } catch (error) {
      console.error("Create appointment error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/appointments/:id", authenticateAdmin, async (req, res) => {
    try {
      const appointment = await storage.updateAppointment(req.params.id, req.body);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      console.error("Update appointment error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/appointments/:id", authenticateAdmin, async (req, res) => {
    try {
      const success = await storage.deleteAppointment(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete appointment error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Blog posts routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/blog-posts", authenticateAdmin, async (req, res) => {
    try {
      const post = await storage.createBlogPost(req.body);
      res.json(post);
    } catch (error) {
      console.error("Create blog post error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/blog-posts/:id", authenticateAdmin, async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Update blog post error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/blog-posts/:id", authenticateAdmin, async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete blog post error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
