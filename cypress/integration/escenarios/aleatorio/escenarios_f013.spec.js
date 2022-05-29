const { faker } = require("@faker-js/faker");

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Profile } from "../../pages/admin/profile";

import {
  email as adminEmail,
  password as adminPassword,
} from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const login = new Login();
const profile = new Profile();

/**
 * Agrupación de Escenarios por Funcionalidad
 * F005: Edición Admin Profile
 */
describe("Funcionalidad F013: Edición Admin Profile", () => {
  before(() => {
    faker.seed(10005);
    login.login(adminEmail, adminPassword);
  });

  after(() => {
    settingsPage.navigateToLabs();
    settingsPage.deleteAllContent();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("ghost-admin-api-session");
    dashboard.navigate();
  });

  describe("Escenarios Positivos", () => {
    it("F013E01: ", () => {
      // GIVEN (additional to the login and dashboard navigation)
      // that the admin navitages to the dashboard, and goes to
      // your profile
      dashboard.navigate();
      profile.openProfile();

      let name = faker.lorem.words();
      profile.writeName(name);

      profile.saveProfile();

      cy.wait(300);
      dashboard.navigate();
      cy.wait(300);

      profile.openProfile();
      profile.readName((txt) => expect(txt).to.equal(name));
    });
    it("F013E07: ", () => {
      // GIVEN (additional to the login and dashboard navigation)
      // that the admin navitages to the dashboard, and goes to
      // your profile
      dashboard.navigate();
      profile.openProfile();

      let slug = faker.lorem.slug();
      profile.writeSlug(slug);

      profile.saveProfile();

      cy.wait(300);
      dashboard.navigate();
      cy.wait(300);

      profile.openProfile();
      profile.readSlug((txt) => expect(txt).to.equal(slug));
    });
  });

  describe("Escenarios Negativos", () => {
    it("F013E04: ", () => {
      // GIVEN (additional to the login and dashboard navigation)
      // that the admin navitages to the dashboard, and goes to
      // your profile
      dashboard.navigate();
      profile.openProfile();

      let adminName = faker.lorem.words(192);
      profile.writeName(adminName);

      profile.saveProfile();

      cy.wait(300);
      dashboard.navigate();
      cy.wait(300);

      profile.openProfile();
      profile.readName((txt) => expect(txt).to.equal(adminName));
    });
    it("F013E10: ", () => {
      // GIVEN (additional to the login and dashboard navigation)
      // that the admin navitages to the dashboard, and goes to
      // your profile
      dashboard.navigate();
      profile.openProfile();

      let slug = faker.lorem.slug(60);
      profile.writeSlug(slug);

      profile.saveProfile();

      cy.wait(300);
      dashboard.navigate();
      cy.wait(300);

      profile.openProfile();
      profile.readSlug((txt) => expect(txt).to.equal(slug));
    });
  });
});
