import { adminUrls } from "../../../fixtures/urls";

export class SettingsPage {
    navigateToLabs() {
        cy.visit(adminUrls.settingsUrls.labs);
        cy.wait(2000);
    }
    deleteAllContent() {
        cy.get('.js-delete').first().click();
        cy.wait(2000);
        cy.get('div.modal-footer > .gh-btn-red').first().click();
        cy.wait(300);
    }
}