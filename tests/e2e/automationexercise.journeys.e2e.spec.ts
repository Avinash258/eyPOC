import { test, expect } from "@playwright/test";
import { constants } from "../../config/constants";

test.describe("AutomationExercise Critical Journeys", () => {
  test(`Home -> Products -> Search product ${constants.tags.smoke}`, async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Products" })).toBeVisible();
    await page.getByRole("link", { name: "Products" }).click();
    await expect(page).toHaveURL(/products/i);

    await page.locator("#search_product").fill("Blue Top");
    await page.locator("#submit_search").click();
    await expect(page.getByText("Blue Top").first()).toBeVisible();
  });

  test(`Add product to cart and verify cart page ${constants.tags.regression}`, async ({ page }) => {
    await page.goto("/products");
    await page.getByText("Add to cart").first().click();
    await page.getByRole("link", { name: "View Cart" }).click();
    await expect(page).toHaveURL(/view_cart/i);
    await expect(page.locator("#cart_info_table")).toBeVisible();
  });

  test(`Navigate to login/signup ${constants.tags.sanity}`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await expect(page).toHaveURL(/login/i);
    await expect(page.getByText("New User Signup!")).toBeVisible();
  });
});
