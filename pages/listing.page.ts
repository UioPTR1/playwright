import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { formatDate } from "../utils/utils";

export class ListingPage extends BasePage {
    readonly checkInDate: Locator;
    readonly checkOutDate: Locator;
    readonly guests: Locator;
    readonly decreaseChildrenButton: Locator;
    readonly closeGuestsButton: Locator;
    readonly closeDateWindow: Locator;
    readonly reserveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkInDate = page.getByTestId('change-dates-checkIn')
        this.checkOutDate = page.getByTestId('change-dates-checkOut');
        this.guests = page.locator('#GuestPicker-book_it-trigger');
        this.decreaseChildrenButton = page.getByTestId('GuestPicker-book_it-form-children-stepper-decrease-button');
        this.closeGuestsButton = page.locator("[aria-labelledby='GuestPicker-book_it-form']").getByText("Close");
        this.closeDateWindow = page.getByTestId("availability-calendar-save");
        this.reserveButton = page.locator("[data-section-id='BOOK_IT_SIDEBAR']").getByTestId("homes-pdp-cta-btn");
    }

    async getCheckInDate(): Promise<string> {
        return await this.checkInDate.textContent() || '';
    }

    async getCheckoutDate(): Promise<string> {
        return await this.checkOutDate.textContent() || '';
    }

    async getGuestsAmount(): Promise<number> {
        return parseInt(await this.guests.textContent() || '');
    }

    async clickOnGuests() {
        await this.guests.click();
    }

    async decreaseChildren(amount: number) {
        for (let index = 0; index < amount; index++) {
            await this.decreaseChildrenButton.click();
        }
    }

    async clickOnSpecificDate(date: Date) {
        const formattedData = formatDate(date);
        const calendarDay = this.page.getByTestId('bookit-sidebar-availability-calendar').getByTestId(`calendar-day-${formattedData}`);
        await calendarDay.click();
    }

    async closeGuests() {
        await this.closeGuestsButton.click();
    }

    async clickOnCheckInDate() {
        this.checkInDate.click();
    }

    async checkIfDateBlocked(date: Date): Promise<boolean> {
        const formattedData = formatDate(date);
        const calendarDay = this.page.getByTestId('bookit-sidebar-availability-calendar').getByTestId(`calendar-day-${formattedData}`);
        if (await calendarDay.getAttribute('data-is-day-blocked') === 'true') {
            return true;
        }
        return false;
    }

    async clickOnCloseDateWindow() {
        await this.closeDateWindow.click();
    }

    async clickOnReserveButton() {
        await this.reserveButton.click();
    }
}