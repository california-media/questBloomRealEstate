import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  ////this is for developement only, in vercel production deployment the vercel serverless api folder will take over
  server: {
    proxy: {
      "/api": {
        target: "https://search-listings-production.up.railway.app/v1", // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/crm": {
        target: "https://questrealestatecrm.com", // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/crm/, ""),
      },
      "/leads-email": {
        target: "http://localhost:8000/api/crm-leads-email", // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/leads-email/, ""),
      },
      "/contact-email": {
        target: "http://localhost:8000/api/contact-email", // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/contact-email/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
});
