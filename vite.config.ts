import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    cssMinify: false,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  css: {
    postcss: "configs/postcss",
    devSourcemap: true,
  },
  server: {
    port: 5173,
  },
});
