import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        core: './packages/core/src/index.ts',
        'use-auto-capitalize': './packages/use-auto-capitalize/src/index.ts',
        'use-email': './packages/use-email/src/index.ts',
        'use-length': './packages/use-length/src/index.ts',
        'use-valid-zip': './packages/use-valid-zip/src/index.ts',
      },
      name: 'super-form',
    },
    rollupOptions: {
      external: ['vue', new RegExp('cypress/*')],
    }
  }
})
