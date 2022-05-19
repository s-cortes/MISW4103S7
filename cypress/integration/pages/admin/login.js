import { adminUrls } from "../../../fixtures/urls";

export class Login {
    login(userName, password) {
        cy.visit(adminUrls.loginUrl);
        cy.wait(300);
        cy.get('input.email').type(userName);
        cy.get('input.password').type(password);
        cy.get('button.login').click();
        cy.wait(300);
    }
}