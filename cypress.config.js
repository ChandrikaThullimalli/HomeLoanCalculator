const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: "cypress/support/index.js",
    baseURL:"https://anz.com.au/personal/home-loans/calculators-tools/much-borrow/",
    setupNodeEvents(on, config) {
  },
}
});
