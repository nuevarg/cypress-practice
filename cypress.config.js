const { defineConfig } = require("cypress");
const timestamp = new Date()
  .toISOString()
  .replace(/:/g, "-")
  .replace(/\./g, "-");

module.exports = defineConfig({
  allowCypressEnv: true,
  video: true,
  chromeWebSecurity: false,
  fixturesFolder: "./cypress/fixtures",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportFilename: `automation-report-${timestamp}`,
    overwrite: false,
    html: true,
    json: true,
    saveJson: true,
    charts: true,
    reportPageTitle: `cypress-practice-${timestamp}`,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    ignoreVideos: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
