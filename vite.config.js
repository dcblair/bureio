import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    minify: "esbuild",
    cssMinify: "esbuild",
  },
  plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
});
