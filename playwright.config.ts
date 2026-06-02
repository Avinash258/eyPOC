import { defineConfig } from "@playwright/test";
import { env } from "./config/env";

export default defineConfig({
  testDir: ".",
  testMatch: ["tests/**/*.spec.ts"],
  fullyParallel: true,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 2 : undefined,
  timeout: 60_000,
  reporter: [
    ["list"],
    ["allure-playwright", { outputFolder: "reports/allure-results" }],
    ["html", { outputFolder: "reports/playwright-html", open: "never" }]
  ],
  use: {
    baseURL: env.baseUiUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: "api-and-monitoring",
      testMatch: ["tests/api/**/*.ts", "tests/monitoring/**/*.ts"]
    },
    {
      name: "chromium-e2e",
      testMatch: ["tests/e2e/**/*.ts"],
      use: { browserName: "chromium" }
    }
  ]
});
