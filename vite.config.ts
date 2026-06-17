import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { viteStaticCopy } from "vite-plugin-static-copy"

const isGithubPages =
  process.env.GITHUB_PAGES ===
  "true"

export default defineConfig({
  base: isGithubPages
    ? "/task-hours-extension/"
    : "./",

  plugins: [
    react(),

    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: "."
        },

        {
          src: "public/background.js",
          dest: "."
        },

        {
          src: "public/icon*",
          dest: "."
        }
      ]
    })
  ],

  build: {
    outDir: "dist"
  }
})