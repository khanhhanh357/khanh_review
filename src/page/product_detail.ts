import { Page } from "@playwright/test";
import { CommonPage } from "./page";
import { Cart } from "./cart";

export class ProductDetail extends CommonPage {
  constructor(domain: string, page: Page) {
    super(domain, page);
  }

  /**
   * Click to add to cart button
   */
  async clickAddToCartBtn() {
    await this.page.locator(`//span[text()='Add to cart']`).click();
    await this.page.waitForLoadState("networkidle");
    return new Cart(this.domain, this.page);
  }
}
