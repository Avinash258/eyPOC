import { expect, Page } from "@playwright/test";
import { urls } from "../../../config/urls";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto(urls.ui.login);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
    await expect(this.page).toHaveURL(urls.ui.inventory);
  }
}
