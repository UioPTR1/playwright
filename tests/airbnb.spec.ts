import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { SearchResultPage } from "../pages/search-result.page";
import { ListingPage } from "../pages/listing.page";
import { addDays, formatDate } from "../utils/utils";
import { ReservationPage } from "../pages/reservation.page";
import { Dialog } from "../components/dialog.component";

test.describe("Airbnb", () => {
  test("Should test airbnb", async ({ page, context }) => {
    const homePage = new HomePage(page);
    const checkInDate = addDays(new Date(), 1);
    const checkOutDate = addDays(new Date(), 2);
    const formattedCheckInDate = formatDate(checkInDate);
    const formattedCheckOutDate = formatDate(checkOutDate);

    await homePage.goTo();
    await homePage.inputDestionation("London, United Kingdom");
    await homePage.clickOnLocationResultByRow(0);
    await homePage.clickOnCheckInDateButton();
    await homePage.clickOnSpecificDate(formattedCheckInDate);
    await homePage.clickOnSpecificDate(formattedCheckOutDate);
    await homePage.clickOnGuestsButton();
    await homePage.addAdults(2);
    expect(await homePage.getAdultsAmount()).toEqual(2);
    await homePage.addChildren(1);
    expect(await homePage.getChildrenAmount()).toEqual(1);
    await homePage.clickOnSearch();
    
    const pagePromise = context.waitForEvent("page");
    const resultsPage = new SearchResultPage(page);
    await resultsPage.waitForResultsToShow();
    await resultsPage.clickOnResultByIndex(1);

    const newPage = await pagePromise;

    const listingPage = new ListingPage(newPage);
    const dialog = new Dialog(newPage);
    if (await dialog.isDialogVisible()) {
      await dialog.closeDialog();
    }
    expect(await listingPage.getCheckInDate()).toEqual(
      checkInDate.toLocaleDateString("en-us")
    );
    expect(await listingPage.getCheckoutDate()).toEqual(
      checkOutDate.toLocaleDateString("en-us")
    );
    expect(await listingPage.getGuestsAmount()).toEqual(3);

    await listingPage.clickOnGuests();
    await listingPage.decreaseChildren(1);
    await listingPage.closeGuests();
    expect(await listingPage.getGuestsAmount()).toEqual(2);

    await listingPage.clickOnCheckInDate();
    const checkInBlocked = await listingPage.checkIfDateBlocked(
      addDays(checkInDate, 7)
    );
    const checkOutBlocked = await listingPage.checkIfDateBlocked(
      addDays(checkOutDate, 7)
    );

    if (!checkInBlocked && !checkOutBlocked) {
      await listingPage.clickOnSpecificDate(addDays(checkInDate, 7));
      await listingPage.clickOnSpecificDate(addDays(checkOutDate, 7));
    } else {
      await listingPage.clickOnCloseDateWindow();
    }
    await listingPage.clickOnReserveButton();
    await expect(newPage).toHaveURL(/.*book/);
    const reservationPage = new ReservationPage(newPage);
    await reservationPage.clickOnEditGuestsButton();
    expect(await reservationPage.getAdultsAmount()).toEqual(2);
  });
});
