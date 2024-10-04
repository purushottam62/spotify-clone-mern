import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://spotify-clone-mern-2.onrender.com",
        changeOrigin: true,
        secure: false, // Set to `true` if using HTTPS
      },
    },
  },
});
