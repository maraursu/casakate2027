import { resolve } from "node:path";
import type { Plugin } from "vite";
import { handleRsvpApi } from "./rsvpApi.ts";

export function rsvpApiPlugin(root: string): Plugin {
  const filePath = resolve(root, "data/rsvps.json");

  return {
    name: "rsvp-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split("?")[0];
        if (path !== "/api/rsvp") {
          next();
          return;
        }
        await handleRsvpApi(req, res, filePath);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split("?")[0];
        if (path !== "/api/rsvp") {
          next();
          return;
        }
        await handleRsvpApi(req, res, filePath);
      });
    },
  };
}
