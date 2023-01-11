/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbulPlugin from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ["tests/unit/**/*.spec.ts"],
  },
  plugins: [
    vue(),
    istanbulPlugin({
      cypress: true,
      requireEnv: false,
    }),
  ],
})
