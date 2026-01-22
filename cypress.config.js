const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const getEnvironmentConfig = require('./config/environments');

async function setupNodeEvents(on, config) {
  // Get environment-specific configuration
  const environment = config.env.environment || 'dev';
  const envConfig = getEnvironmentConfig(environment);

  // Merge environment config with Cypress config
  config.baseUrl = envConfig.baseUrl;
  config.env.apiUrl = envConfig.apiUrl;
  config.defaultCommandTimeout = envConfig.timeout;

  // Add cucumber preprocessor
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: '**/*.{feature,features}',
    setupNodeEvents,
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: !process.env.CI,
    screenshotOnRunFailure: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      environment: 'dev',
    },
  },
});
