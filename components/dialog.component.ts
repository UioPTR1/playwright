import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/base.page";

export class Dialog extends BasePage {
    readonly dialog: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.dialog = page.getByRole('dialog');
        this.closeButton = this.dialog.locator("button[aria-label='Close']");
    }

    async isDialogVisible(): Promise<boolean> {
        try {
            await this.dialog.waitFor({ state: 'visible', timeout: 10000 });
        } catch (error) {
            console.log(error);
            return false;   
        }
        return true;
    }

    async closeDialog() {
        await this.closeButton.click();
    }
}