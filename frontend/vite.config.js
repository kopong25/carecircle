import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Dev only: /api/* → FastAPI on :8000
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    // Output to frontend/dist — FastAPI serves this in production
    outDir: "dist",
    emptyOutDir: true,
  },
});
