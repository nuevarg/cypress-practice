const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: false,
  //failOnStatusCode: false,
  chromeWebSecurity: false,
  fixturesFolder: "./cypress/fixtures",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    saveJson: true,
    charts: true,
    reportPageTitle: "cyrpress-practice",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: false,
    ignoreVideos: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
