import { test, expect } from "@playwright/test";
import { Home } from "../../src/page/home";
import { DATA } from "../../data/product";
import { ViewProduct } from "../../src/page/viewproduct";



test.describe("Checkout function", () => {
    test("Checkout an order", async ({ page }) => {
    
      let homePage: Home;
      let viewProduct:ViewProduct;
      const domain: string = process.env.DOMAIN!;
  
      await test.step("Initialize env", async () => {
        homePage = new Home(domain, page);
        // goto home page
        await homePage.gotoHome();
      });
  
      await test.step("Verify if we are in the home page", async () => {
        await expect(homePage.page.locator("//strong[@class='h1 flex items-center m0']")).toHaveText(
          "au-abandoned-prodtest"
        );
      });
  

      await test.step("Go to view product", async () => {

            for(let i=0;i<DATA.length;i++){
             const viewProduct=  await homePage.gotoProduct(DATA[i].name)
             expect(await (await viewProduct.getText()).split(' ').join('-')).toEqual(DATA[i].name.toUpperCase());
            }


      });
  
    
      
    });
  });
  