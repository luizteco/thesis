import express from "express";
import cors from "cors";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase setup
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
}
const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

// Middleware
app.use(cors());
app.use(express.json());

const safeId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

// Helpers
const ensureSupabase = (res) => {
  if (!supabase) {
    res.status(500).json({ error: "Server misconfigured: Supabase not available" });
    return false;
  }
  return true;
};

// GET /api/requests - Get all product requests with like counts
app.get("/api/requests", async (req, res) => {
  if (!ensureSupabase(res)) return;
  try {
    const { data: requests, error: reqErr } = await supabase
      .from("requests")
      .select("id, name, description, timestamp");
    if (reqErr) throw reqErr;

    const { data: likes, error: likeErr } = await supabase
      .from("likes")
      .select("request_id, client_id");
    if (likeErr) throw likeErr;

    const likesByRequest = likes?.reduce((acc, like) => {
      acc[like.request_id] = (acc[like.request_id] || 0) + 1;
      return acc;
    }, {}) || {};

    const enriched = (requests || []).map((r) => ({
      ...r,
      likes: likesByRequest[r.id] || 0,
    })).sort((a, b) => b.likes - a.likes || b.timestamp - a.timestamp);

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// POST /api/requests - Create a new product request
app.post("/api/requests", async (req, res) => {
  if (!ensureSupabase(res)) return;
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  try {
    const id = safeId();
    const timestamp = Date.now();
    const { error } = await supabase.from("requests").insert({
      id,
      name: name.trim(),
      description: description.trim(),
      timestamp,
    });
    if (error) throw error;

    res.status(201).json({ id, name: name.trim(), description: description.trim(), timestamp, likes: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create request" });
  }
});

// POST /api/requests/:id/like - Like/unlike a request
app.post("/api/requests/:id/like", async (req, res) => {
  if (!ensureSupabase(res)) return;
  const { requestId, clientId } = req.body;

  if (!clientId || !requestId) {
    return res.status(400).json({ error: "Client ID and request ID are required" });
  }

  try {
    const { data: existing, error: selectErr } = await supabase
      .from("likes")
      .select("request_id")
      .eq("request_id", requestId)
      .eq("client_id", clientId)
      .maybeSingle();
    if (selectErr) throw selectErr;

    if (existing) {
      const { error: delErr } = await supabase
        .from("likes")
        .delete()
        .eq("request_id", requestId)
        .eq("client_id", clientId);
      if (delErr) throw delErr;
    } else {
      const { error: insErr } = await supabase
        .from("likes")
        .insert({ request_id: requestId, client_id: clientId, timestamp: Date.now() });
      if (insErr) throw insErr;
    }

    const { data: likeCountData, count: likeCount, error: countErr } = await supabase
      .from("likes")
      .select("request_id", { count: "exact", head: true })
      .eq("request_id", requestId);
    if (countErr) throw countErr;

    const likes = typeof likeCount === "number" ? likeCount : likeCountData?.length || 0;
    res.json({ likes, userLiked: !existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle like" });
  }
});

// GET /api/requests/:id/likes/:clientId - Check if user has liked this request
app.get("/api/requests/:id/likes/:clientId", async (req, res) => {
  if (!ensureSupabase(res)) return;
  const { id, clientId } = req.params;
  try {
    const { data, error } = await supabase
      .from("likes")
      .select("request_id")
      .eq("request_id", id)
      .eq("client_id", clientId)
      .maybeSingle();
    if (error) throw error;
    res.json({ userLiked: !!data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check like" });
  }
});

// GET /api/printing-services - Get all printing services
app.get("/api/printing-services", async (req, res) => {
  if (!ensureSupabase(res)) return;
  try {
    const { data, error } = await supabase
      .from("printing_services")
      .select("id, name, postal_code, printers, hourly_rate, email, timestamp")
      .order("timestamp", { ascending: false });
    if (error) throw error;

    // map field names back to camelCase for frontend
    const services = (data || []).map((s) => ({
      id: s.id,
      name: s.name,
      postalCode: s.postal_code,
      printers: s.printers,
      hourlyRate: s.hourly_rate,
      email: s.email,
      timestamp: s.timestamp,
    }));

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch printing services" });
  }
});

// POST /api/printing-services - Register a new printing service
app.post("/api/printing-services", async (req, res) => {
  if (!ensureSupabase(res)) return;
  const { name, postalCode, printers, hourlyRate, email } = req.body;

  if (!name || !postalCode || !printers || !hourlyRate || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const timestamp = Date.now();
    const { data, error } = await supabase
      .from("printing_services")
      .insert({
        name: name.trim(),
        postal_code: postalCode.trim(),
        printers: printers.trim(),
        hourly_rate: hourlyRate.trim(),
        email: email.trim(),
        timestamp,
      })
      .select("id, name, postal_code, printers, hourly_rate, email, timestamp")
      .single();

    if (error) throw error;

    res.status(201).json({
      id: data.id,
      name: data.name,
      postalCode: data.postal_code,
      printers: data.printers,
      hourlyRate: data.hourly_rate,
      email: data.email,
      timestamp: data.timestamp,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register service" });
  }
});

app.listen(PORT, () => {
  console.log(`Product requests server running on http://localhost:${PORT}`);
});
