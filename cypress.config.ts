import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
    baseUrl: 'http://localhost:5173',
    supportFile: 'tests/support/e2e.ts',
    specPattern: 'tests/**/*.cy.ts',
    videosFolder: 'tests/videos',
    screenshotsFolder: 'tests/screenshots',
    video: false,
  },
});
