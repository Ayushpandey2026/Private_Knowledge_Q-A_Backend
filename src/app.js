import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";

// Route Imports
import healthRoutes from "./routes/health.routes.js";
import documentRoutes from "./routes/documents.routes.js";
import qaRoutes from "./routes/qa.routes.js";

const app = express();

app.use(express.json()); 

const corsOptions = {
  origin: ENV.FRONTEND_URL,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
app.use("/health", healthRoutes);
app.use("/documents", documentRoutes);
app.use("/qa", qaRoutes);

export default app; // Ye line zaroori hai