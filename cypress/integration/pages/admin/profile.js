import { adminUrls } from "../../../fixtures/urls";

export class Profile {
  openProfile() {
    cy.get("div.gh-user-avatar").first().click();
    cy.wait(500);
    cy.contains("a.dropdown-item", "Your profile").first().click();
    cy.wait(500);
    cy.get("div.items-center > div.gh-user-avatar").first().click();
    cy.wait(500);
  }

  saveProfile() {
    cy.get("button.gh-btn-primary").first().click();
    cy.wait(300);
  }

  writeName(name) {
    cy.wait(500);
    cy.get("#user-name").clear().type(name, { force: true });
    cy.wait(500);

    return name;
  }

  writeSlug(slug) {
    cy.get("#user-slug").clear().type(slug, { force: true });
    cy.wait(500);

    return slug;
  }

  readName(callback) {
    cy.get("#user-name")
      .first()
      .invoke("val")
      .then((val) => callback(val));
  }

  readSlug(callback) {
    cy.get("#user-slug")
      .first()
      .invoke("val")
      .then((val) => callback(val));
  }
}
