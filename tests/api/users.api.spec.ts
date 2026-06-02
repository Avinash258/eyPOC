import { test, expect } from "@playwright/test";
import { constants } from "../../config/constants";

test.describe("API Automation - Users", () => {
  test(`GET products list ${constants.tags.smoke}`, async ({ request }) => {
    const response = await request.get("/api/productsList");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body.toLowerCase()).toContain("products");
  });

  test(`POST products list method not allowed ${constants.tags.sanity}`, async ({ request }) => {
    const response = await request.post("/api/productsList", {
      form: { search_product: "top" }
    });
    expect(response.status()).toBe(200);
    const payload = await response.json();
    expect(payload.responseCode).toBe(405);
  });

  test(`PUT brands list method not allowed ${constants.tags.regression}`, async ({ request }) => {
    const response = await request.put("/api/brandsList", {
      form: { brand: "Polo" }
    });
    expect(response.status()).toBe(200);
    const payload = await response.json();
    expect(payload.responseCode).toBe(405);
  });

  test(`DELETE brands list method not allowed ${constants.tags.regression}`, async ({ request }) => {
    const response = await request.delete("/api/brandsList");
    expect(response.status()).toBe(200);
    const payload = await response.json();
    expect(payload.responseCode).toBe(405);
  });
});
