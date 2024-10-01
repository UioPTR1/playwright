import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class SearchResultPage extends BasePage { 
    readonly results: Locator;

    constructor(page: Page) {
        super(page);
        this.results = this.page.getByTestId('card-container');
    } 

    async clickOnResultByIndex(index: number) {
        await this.results.nth(index).click();
    }

    async waitForResultsToShow() {
        await expect(this.results.first()).toBeVisible();
    }
}