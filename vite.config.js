import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    minify: "esbuild",
    cssMinify: "esbuild",
  },
  plugins: [!process.env.VITEST && remix(), tsconfigPaths()],
});
