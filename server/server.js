import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const dataFile = path.join(__dirname, "requests-data.json");
const servicesFile = path.join(__dirname, "printing-services.json");

// Initialize data file if it doesn't exist
function initializeDataFile() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ requests: {}, likes: {} }));
  }
  if (!fs.existsSync(servicesFile)) {
    fs.writeFileSync(servicesFile, JSON.stringify({ services: {} }));
  }
}

// Read all requests
function readRequests() {
  try {
    const data = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return { requests: {}, likes: {} };
  }
}

// Write requests to file
function writeRequests(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Read all printing services
function readServices() {
  try {
    const data = fs.readFileSync(servicesFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return { services: {} };
  }
}

// Write printing services to file
function writeServices(data) {
  fs.writeFileSync(servicesFile, JSON.stringify(data, null, 2));
}

// GET /api/requests - Get all product requests
app.get("/api/requests", (req, res) => {
  const data = readRequests();
  const requests = Object.values(data.requests || {})
    .map((req) => ({
      ...req,
      likes: Object.values(data.likes || {}).filter(
        (like) => like.requestId === req.id
      ).length,
    }))
    .sort((a, b) => b.likes - a.likes || b.timestamp - a.timestamp);

  res.json(requests);
});

// POST /api/requests - Create a new product request
app.post("/api/requests", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const data = readRequests();
  const id = Date.now().toString();

  const newRequest = {
    id,
    name: name.trim(),
    description: description.trim(),
    timestamp: Date.now(),
  };

  data.requests[id] = newRequest;
  writeRequests(data);

  res.status(201).json({
    ...newRequest,
    likes: 0,
  });
});

// POST /api/requests/:id/like - Like/unlike a request
app.post("/api/requests/:id/like", (req, res) => {
  const { requestId } = req.body;
  const clientId = req.body.clientId;

  if (!clientId) {
    return res.status(400).json({ error: "Client ID is required" });
  }

  const data = readRequests();
  const likeKey = `${requestId}-${clientId}`;

  if (data.likes && data.likes[likeKey]) {
    // Unlike
    delete data.likes[likeKey];
  } else {
    // Like
    if (!data.likes) data.likes = {};
    data.likes[likeKey] = { requestId, clientId, timestamp: Date.now() };
  }

  writeRequests(data);

  // Recalculate likes for this request
  const likes = Object.values(data.likes || {}).filter(
    (like) => like.requestId === requestId
  ).length;

  res.json({ likes, userLiked: !!data.likes[likeKey] });
});

// GET /api/requests/:id/likes - Check if user has liked this request
app.get("/api/requests/:id/likes/:clientId", (req, res) => {
  const { id, clientId } = req.params;
  const data = readRequests();
  const likeKey = `${id}-${clientId}`;
  const userLiked = !!(data.likes && data.likes[likeKey]);

  res.json({ userLiked });
});

// GET /api/printing-services - Get all printing services
app.get("/api/printing-services", (req, res) => {
  const data = readServices();
  const services = Object.values(data.services || {}).sort(
    (a, b) => b.timestamp - a.timestamp
  );
  res.json(services);
});

// POST /api/printing-services - Register a new printing service
app.post("/api/printing-services", (req, res) => {
  const { name, postalCode, printers, hourlyRate, email } = req.body;

  if (!name || !postalCode || !printers || !hourlyRate || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const data = readServices();
  const id = Date.now().toString();

  const newService = {
    id,
    name: name.trim(),
    postalCode: postalCode.trim(),
    printers: printers.trim(),
    hourlyRate: hourlyRate.trim(),
    email: email.trim(),
    timestamp: Date.now(),
  };

  data.services[id] = newService;
  writeServices(data);

  res.status(201).json(newService);
});

initializeDataFile();

app.listen(PORT, () => {
  console.log(`Product requests server running on http://localhost:${PORT}`);
});
