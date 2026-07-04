/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".kilo"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/lib/**", "src/data/**", "src/hooks/**"],
      exclude: ["src/**/*.test.*", "src/__tests__/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
