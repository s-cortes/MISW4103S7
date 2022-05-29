const { faker } = require("@faker-js/faker");

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Profile } from "../../pages/admin/profile";

import { pool as profilePositivePool } from "../../../fixtures/positive/profile.json";
import { pool as profileNegativePool } from "../../../fixtures/negative/profile.json";
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
    it("F013E02: ", () => {
      profilePositivePool.forEach((profilePoolObj) => {
        dashboard.navigate();
        profile.openProfile();

        profile.writeName(profilePoolObj.name);

        profile.saveProfile();

        cy.wait(300);
        dashboard.navigate();
        cy.wait(300);

        profile.openProfile();
        profile.readName((txt) => expect(txt).to.equal(profilePoolObj.name));
      });
    });
    it("F013E08: ", () => {
      profilePositivePool.forEach((profilePoolObj) => {
        dashboard.navigate();
        profile.openProfile();

        profile.writeSlug(profilePoolObj.slug);

        profile.saveProfile();

        cy.wait(300);
        dashboard.navigate();
        cy.wait(300);

        profile.openProfile();
        profile.readSlug((txt) => expect(txt).to.equal(profilePoolObj.slug));
      });
    });
  });

  describe("Escenarios Negativos", () => {
    it("F013E05: ", () => {
      profileNegativePool.forEach((profilePoolObj) => {
        // GIVEN (additional to the login and dashboard navigation)
        // that the admin navitages to the dashboard, and goes to
        // your profile
        dashboard.navigate();
        profile.openProfile();

        profile.writeName(profilePoolObj.name);

        profile.saveProfile();

        cy.wait(300);
        dashboard.navigate();
        cy.wait(300);

        profile.openProfile();
        profile.readName((txt) => expect(txt).to.equal(profilePoolObj.name));
      });
    });
    it("F013E11: ", () => {
      profileNegativePool.forEach((profilePoolObj) => {
        // GIVEN (additional to the login and dashboard navigation)
        // that the admin navitages to the dashboard, and goes to
        // your profile
        dashboard.navigate();
        profile.openProfile();

        profile.writeSlug(profilePoolObj.slug);

        profile.saveProfile();

        cy.wait(300);
        dashboard.navigate();
        cy.wait(300);

        profile.openProfile();
        profile.readSlug((txt) => expect(txt).to.equal(profilePoolObj.slug));
      });
    });
  });
});
