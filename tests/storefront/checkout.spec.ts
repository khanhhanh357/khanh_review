import { test, expect } from "@playwright/test";
import { Checkout } from "../../src/page/checkout";
import { Collection } from "../../src/page/collection";
import { ProductDetail } from "../../src/page/product_detail";
import { Cart } from "../../src/page/cart";
import { Home } from "../../src/page/home";

test.describe("Checkout function", () => {
  test("Checkout an order", async ({ page }) => {
    let shopCollection: Collection;
    let productDetail: ProductDetail;
    let cart: Cart;
    let checkout: Checkout;
    let homePage: Home;
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

    await test.step("Go to collection page", async () => {
      shopCollection = await homePage.gotoCollectionPage("best-selling");
    });

    await test.step("Go to product and add to cart", async () => {
      productDetail = await shopCollection.gotoProductItem("Suit");
      cart = await productDetail.clickAddToCartBtn();
    });

    await test.step("Checkout the order", async () => {
      checkout = await cart.clickCheckoutBtn();
      await checkout.enterUserInfo({
        email: "khanhhanh357@mailtothis.com",
        firstName: "Khanh",
        lastName: "Nguyen",
        address: "Ha Noi",
        country: "Viet Nam",
        state: "Ha Noi",
        city: "Ha Noi",
        zipcode: "100000",
        phoneNumber: "0981637239",
      });

      await checkout.clickContinuePayment();

      await checkout.enterCardInfo({
        holderName: "NGUYEN DUY KHANH",
        number: "4242 4242 4242 4242",
        expireDate: "12/26",
        cvv: "111",
      });

      await checkout.clickCompleteOrder();
    });

    await test.step("Verify whether order to be completed", async () => {
      expect(checkout.page).toHaveURL(/.*step=thank_you/);
    });
  });
});
