import { Page } from "@playwright/test";
import { CommonPage } from "./page";
import { ProductDetail } from "./product_detail";

export class Collection extends CommonPage {
  constructor(domain: string, page: Page) {
    super(domain, page);
  }

  /**
   * Go to a specific product
   * @param name name of the product
   */
  async gotoProductItem(name: string) {
    // Eg. name = Randoseru Kids Primary School Bag Ergonomic Backpack
    await Promise.all([this.page.locator(`//span[text()="${name}"]`).click(), this.page.waitForNavigation()]);
    return new ProductDetail(this.domain, this.page);
  }
}
