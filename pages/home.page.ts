import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly url = "http://www.airbnb.com/";
  readonly page: Page;
  readonly searchButton: Locator;
  readonly destinationInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByTestId("structured-search-input-search-button");
    this.destinationInput = page.getByTestId("structured-search-input-field-query")
  }

  async goTo() {
    await this.page.goto(this.url);
  }

  async inputDestionation(destination: string) {
    await this.destinationInput.fill(destination);
  }

  async clickOnSearch() {
    await this.searchButton.click();
  }
}
