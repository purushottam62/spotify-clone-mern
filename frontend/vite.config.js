import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Makes it accessible to external networks (for deployment)
    port: process.env.PORT || 4173, // Default to 4173 for local development, or use the port set by Render
    proxy: {
      "/api": {
        target: "https://spotify-clone-mern-2.onrender.com", // Backend URL
        changeOrigin: true,
        secure: false, // Set to `true` if the target is using HTTPS
      },
    },
  },
  preview: {
    port: process.env.PORT || 4173, // Use the correct port in production for vite preview
  },
});
