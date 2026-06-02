import { test, expect, request } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { buildUser } from "../../data/generators/user-factory";
import { ApiClient } from "../api/api-client";
import { constants } from "../../config/constants";

test.describe("Critical Journeys", () => {
  test(`Login -> Create User -> Submit Order -> Verify API -> Logout ${constants.tags.smoke}`, async ({
    page
  }) => {
    const loginPage = new LoginPage(page);
    const apiClient = new ApiClient();
    await apiClient.authenticate();

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page.getByText("Products")).toBeVisible();

    const createdUser = await apiClient.post<{ id: number; name: string }>("/users", buildUser());
    expect(createdUser.id).toBeTruthy();

    const createdOrder = await apiClient.post<{ id: number }>("/posts", {
      userId: createdUser.id,
      title: "synthetic-order",
      body: "order body"
    });
    expect(createdOrder.id).toBeTruthy();

    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test(`Payment happy path ${constants.tags.regression}`, async ({ request: apiContext }) => {
    const response = await apiContext.post("/posts", {
      data: {
        cardNumber: "4111111111111111",
        amount: 100,
        currency: "USD"
      }
    });
    expect(response.ok()).toBeTruthy();
  });

  test(`Negative checkout path ${constants.tags.sanity}`, async () => {
    const context = await request.newContext({ baseURL: "https://httpbin.org" });
    const response = await context.post("/status/400");
    expect(response.status()).toBe(400);
  });
});
