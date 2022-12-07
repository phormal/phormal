import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        core: './packages/core/src/index.ts',
        'hooks/use-auto-capitalize': './packages/hooks/use-auto-capitalize/src/index.ts',
      },
      name: 'super-form',
      // the proper extensions will be added
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', new RegExp('cypress/*')],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: 'Vue'
        // }
      }
    }
  }
})
