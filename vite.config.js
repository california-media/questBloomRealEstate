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
        target: "https://crm.questrealestate.ae", // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/crm/, ""),
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
