import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { PLANNING_PASSWORD } from "../src/site.ts";
import {
  type Rsvp,
  type RsvpInput,
  emptyRsvp,
  upsertRsvp,
} from "../src/rsvp.ts";

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk as Buffer));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function loadList(filePath: string): Rsvp[] {
  if (!existsSync(filePath)) return [];
  try {
    const parsed = JSON.parse(readFileSync(filePath, "utf8")) as Rsvp[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveList(filePath: string, rows: Rsvp[]) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(rows, null, 2));
}

function isRsvpInput(value: unknown): value is RsvpInput {
  if (!value || typeof value !== "object") return false;
  const row = value as RsvpInput;
  return typeof row.name === "string" && typeof row.email === "string";
}

export async function handleRsvpApi(
  req: IncomingMessage,
  res: ServerResponse,
  filePath: string,
) {
  const method = req.method ?? "GET";
  const url = new URL(req.url ?? "/", "http://localhost");

  if (method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (method === "GET") {
    const key =
      url.searchParams.get("key") ??
      String(req.headers["x-planning-key"] ?? "");
    if (key !== PLANNING_PASSWORD) {
      json(res, 401, { error: "Planning password required to read replies." });
      return;
    }
    json(res, 200, { replies: loadList(filePath) });
    return;
  }

  if (method === "POST") {
    let payload: unknown;
    try {
      payload = JSON.parse((await readBody(req)) || "{}");
    } catch {
      json(res, 400, { error: "Could not read that form." });
      return;
    }
    if (!isRsvpInput(payload) || !payload.name.trim() || !payload.email.trim()) {
      json(res, 400, { error: "Name and email are required." });
      return;
    }
    const merged = { ...emptyRsvp(), ...payload };
    const replies = upsertRsvp(loadList(filePath), merged);
    saveList(filePath, replies);
    const saved = replies.find(
      (row) => row.email === payload.email.trim().toLowerCase(),
    );
    json(res, 200, { ok: true, reply: saved });
    return;
  }

  json(res, 405, { error: "Try GET or POST." });
}
