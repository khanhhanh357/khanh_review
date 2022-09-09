import { Page } from "@playwright/test";
import { CommonPage } from "./page";
import { Collection } from "./collection";
import { ViewProduct } from "./viewproduct";

export class Home extends CommonPage {
  constructor(domain: string, page: Page) {
    super(domain, page);
  }
  /**
   * Go to home page of the current domain
   */
  async gotoHome() {
    await this.gotoPath("");
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Goto collecion's url
   * @param name name of collection
   */
  async gotoCollectionPage(name: string) {
    await this.gotoPath(`collections/${name}`);
    await this.page.waitForLoadState("networkidle");
    return new Collection(this.domain, this.page);
  }

  async gotoProduct(name:string){
    await this.gotoPath(`products/${name}`);
    await this.page.waitForLoadState("networkidle");
    return new ViewProduct(this.domain,this.page);
  }
}
