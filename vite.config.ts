import { defineConfig, type PluginOption } from "vite";
import { enterDevPlugin, enterProdPlugin } from "vite-plugin-enter-dev";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [...enterProdPlugin()];
  if (mode === "development") {
    plugins.push(...enterDevPlugin());
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean) as PluginOption[],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: "/",
    build: {
      outDir: "dist",
      // Raise the warning threshold so CI doesn't fail on the vendor bundle
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        output: {
          // Split the bundle into logical chunks for faster subsequent loads
          manualChunks(id) {
            // React runtime
            if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
              return "vendor-react";
            }
            // React Router
            if (id.includes("node_modules/react-router")) {
              return "vendor-router";
            }
            // Radix UI (shadcn primitives)
            if (id.includes("node_modules/@radix-ui")) {
              return "vendor-radix";
            }
            // All other node_modules
            if (id.includes("node_modules")) {
              return "vendor-misc";
            }
            // Marketplace data (large catalog)
            if (id.includes("/src/data/")) {
              return "app-data";
            }
            // Marketplace UI components
            if (id.includes("/src/components/marketplace/")) {
              return "app-marketplace";
            }
          },
        },
      },
    },
  };
});
