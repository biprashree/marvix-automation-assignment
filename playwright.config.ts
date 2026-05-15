import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  retries: 1,

  reporter: [["html"]],

  use: {
    baseURL: "https://www.airbnb.com",

    headless: false,

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
