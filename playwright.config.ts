import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "npm run dev", // Startbefehl für deinen Entwicklungsserver
    url: "http://localhost:3000",
    timeout: 120 * 250, // Wartezeit auf den Serverstart (30 sek)
    reuseExistingServer: !process.env.CI, // Nutze existierenden Server lokal erneut
  },
  use: {
    baseURL: "http://localhost:3000", // Basis-URL für die Tests
    headless: true, // Tests im Headless-Browser ausführen
  },
});
