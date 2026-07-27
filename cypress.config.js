const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const timestamp = new Date()
  .toISOString()
  .replace(/:/g, "-")
  .replace(/\./g, "-");

module.exports = defineConfig({
  // allowCypressEnv: true,
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

  env: {
    allure: true,
    allureResultsPath: "allure-results",
  },

  e2e: {
    baseUrl: "https://www.saucedemo.com",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      require("@shelex/cypress-allure-plugin/writer")(on, config);

      on("task", {
        // Reads and parses text content from a PDF file
        parsePdf(filePath) {
          return new Promise((resolve) => {
            const pdfPath = path.isAbsolute(filePath)
              ? filePath
              : path.join(config.projectRoot, filePath);
            if (!fs.existsSync(pdfPath)) {
              return resolve({ error: `File not found: ${pdfPath}` });
            }
            const dataBuffer = fs.readFileSync(pdfPath);
            pdfParse(dataBuffer)
              .then((data) =>
                resolve({ text: data.text, numpages: data.numpages, info: data.info })
              )
              .catch((err) => resolve({ error: err.message }));
          });
        },
        // Finds the latest PDF file in the downloads folder
        findDownloadedPdf(downloadsFolder = "cypress/downloads") {
          const dir = path.isAbsolute(downloadsFolder)
            ? downloadsFolder
            : path.join(config.projectRoot, downloadsFolder);
          if (!fs.existsSync(dir)) return null;
          const files = fs.readdirSync(dir).filter((f) => f.endsWith(".pdf"));
          if (files.length === 0) return null;
          const latestFile = files
            .map((f) => ({
              name: f,
              mtime: fs.statSync(path.join(dir, f)).mtimeMs,
            }))
            .sort((a, b) => b.mtime - a.mtime)[0];
          return path.join(dir, latestFile.name);
        },
      });

      return config;
    },
  },
});

