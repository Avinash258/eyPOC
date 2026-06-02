import { test, expect } from "@playwright/test";
import { constants } from "../../config/constants";

test.describe("AutomationExercise API", () => {
  test(`API catalog endpoint is reachable ${constants.tags.smoke}`, async ({ request }) => {
    const response = await request.get("/api/productsList");
    expect([200, 405]).toContain(response.status());
  });

  test(`Brands endpoint responds ${constants.tags.sanity}`, async ({ request }) => {
    const response = await request.get("/api/brandsList");
    expect([200, 405]).toContain(response.status());
  });
});
