import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Listen on all network interfaces (good for local network/ngrok)
    host: "::",
    // Re-add allowedHosts for ngrok access
    allowedHosts: [
      '.ngrok-free.app',
    ],
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});