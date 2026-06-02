import { test, expect } from "@playwright/test";
import { urls } from "../../config/urls";
import { constants } from "../../config/constants";
import { env } from "../../config/env";

test.describe("Monitoring Validation", () => {
  test(`Health endpoint is reachable ${constants.tags.smoke}`, async ({ request }) => {
    const response = await request.get(urls.monitoring.health);
    expect(response.status()).toBeLessThan(500);
  });

  test(`Status endpoint deployment smoke ${constants.tags.sanity}`, async ({ request }) => {
    const response = await request.get(urls.monitoring.status);
    expect([200, 204, 404]).toContain(response.status());
  });

  test(`Grafana and App Insights config guard ${constants.tags.regression}`, async () => {
    if (env.grafanaBaseUrl) {
      expect(env.grafanaApiKey.length).toBeGreaterThan(0);
    }
    if (env.appInsightsAppId) {
      expect(env.appInsightsApiKey.length).toBeGreaterThan(0);
    }
  });
});
