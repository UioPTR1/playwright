import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ReservationPage extends BasePage {
    readonly editGuestsButton: Locator;
    readonly adultsAmount: Locator;

    constructor(page: Page) {
        super(page);
        this.editGuestsButton = this.page.getByTestId('checkout_platform.GUEST_PICKER.edit')
        this.adultsAmount = this.page.getByTestId('GUEST_PICKER-adults-stepper-value');
    }

    async clickOnEditGuestsButton() {
        await this.editGuestsButton.click();
    }

    async getAdultsAmount(): Promise<number> {
        return parseInt(await this.adultsAmount.textContent() || '');
    }
}