import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@Assets": path.resolve(__dirname, "./src/assets"),
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Constant": path.resolve(__dirname, "./src/constant"),
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
      "@Pages": path.resolve(__dirname, "./src/pages"),
      "@SubModules": path.resolve(__dirname, "./src/submodules"),
      "@Utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
