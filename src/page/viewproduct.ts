import { Page } from "@playwright/test";
import { CommonPage } from "./page";


export class ViewProduct extends CommonPage {
  constructor(domain: string, page: Page) {
    super(domain, page);
  }

  async getText(){
    return this.page.locator(`//h1[@class="h3 product__name is-uppercase mt0 mb12"]`).innerText();
 }

}