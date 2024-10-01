import { Browser, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
  readonly searchButton: Locator;
  readonly destinationInput: Locator;
  readonly checkInDateButton: Locator;
  readonly guestsButton: Locator;
  readonly addAdultsButton: Locator;
  readonly addChildrenButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchButton = this.page.getByTestId("structured-search-input-search-button");
    this.destinationInput = this.page.getByTestId("structured-search-input-field-query")
    this.checkInDateButton = this.page.getByTestId('structured-search-input-field-split-dates-0');
    this.guestsButton = this.page.getByTestId('structured-search-input-field-guests-button');
    this.addAdultsButton = this.page.getByTestId('stepper-adults-increase-button');
    this.addChildrenButton = this.page.getByTestId('stepper-children-increase-button');
  }

  async goTo() {
    await this.page.goto('/');
  }

  async inputDestionation(destination: string) {
    await this.destinationInput.fill(destination);
  }

  async clickOnSearch() {
    await this.searchButton.click();
  }

  async clickOnLocationResultByRow(row: number) {
    await this.page.getByTestId(`option-${row}`).click();
  }

  async clickOnCheckInDateButton() {
    await this.checkInDateButton.click();
  }

  async clickOnSpecificDate(date: string) {
    await this.page.getByTestId(date).click();
  }

  async clickOnGuestsButton() {
    await this.guestsButton.click();
  }

  async addAdults(amount: number) {
    for (let index = 0; index < amount; index++) {
      await this.addAdultsButton.click();
    }
  }

  async addChildren(amount: number) {
    for (let index = 0; index < amount; index++) {
      await this.addChildrenButton.click();
    }
  }
}
