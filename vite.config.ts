// Nitro-based deployment config for Vercel (replaces Cloudflare Workers).
// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, VITE_* env injection, @ path alias, React/TanStack dedupe,
// error logger plugins, and sandbox detection (port/host/strictPort).
// Setting cloudflare: false disables the Cloudflare plugin so Nitro handles deployment.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  cloudflare: false,
  plugins: [nitro()],
});
