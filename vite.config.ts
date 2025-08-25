import { defineConfig } from "vite"
import path from "path"
// @ts-expect-error: plugin-react não resolve tipos com moduleResolution: node
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  }
})
