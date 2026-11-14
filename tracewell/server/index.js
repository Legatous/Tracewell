import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes go here as the backend grows (scan requests, marketplace purchases,
// reviews, support requests, etc.) — currently just a health check.
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Serve the built Vite client
const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));

// SPA fallback: any non-API route serves index.html so client-side routing works
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Tracewell server running at http://localhost:${PORT}`);
});
