import { Page } from "@playwright/test";
import { CommonPage } from "./page";
import { Checkout } from "./checkout";

export class Cart extends CommonPage {
  constructor(domain: string, page: Page) {
    super(domain, page);
  }

  /**
   * Click to Checkout button
   */
  public async clickCheckoutBtn() {
    await Promise.all([this.page.locator(`//button[@name='checkout']`).click(), this.page.waitForNavigation()]);
    await this.page.waitForSelector("(//h2[normalize-space()='Contact information'])");
    return new Checkout(this.domain, this.page);
  }
}
