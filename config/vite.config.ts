/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import istanbulPlugin from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ["tests/unit/**/*.spec.ts"],
  },
  plugins: [
    vue(),
    react(),
    istanbulPlugin({
      cypress: true,
      requireEnv: false,
    }),
  ],
})
