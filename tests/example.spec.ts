import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.skip("has title", async ({ page }) => {
  await page.goto("http://www.airbnb.com/");
});

test.skip("get started link", async ({ page }) => {
  await page.goto("http://www.airbnb.com/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("TestGrid Get Started Flow", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goTo();
  await homePage.inputDestionation("Tokyo, Japan");
  await homePage.addCheckInDate();
  await homePage.addCheckOutDate();
  await homePage.addGuests();
  await homePage.clickOnSearch();
});
