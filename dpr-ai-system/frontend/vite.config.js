import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This ensures it listens on all network interfaces
    /*hmr: {
      // Necessary for HMR through ngrok/tunnels
      clientPort: 443 // Assuming ngrok uses standard HTTPS port
    },
    // --- Add this section ---*/
    allowedHosts: [
      'yee-preperusal-certainly.ngrok-free.dev', // Allow any ngrok free domain
      // Or be more specific: 'yee-preperusal-certainly.ngrok-free.app'
    ],
    // -----------------------
  },
});