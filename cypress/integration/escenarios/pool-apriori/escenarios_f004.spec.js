const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const login = new Login();


/**
 * Agrupación de Escenarios por Funcionalidad
 * F004: Creación de Members
 */
describe('Funcionalidad F004: Creación de Members', () => {

    before(() => {
        faker.seed(10004);
        login.login(adminEmail, adminPassword);
    });

    after(() => {
        settingsPage.navigateToLabs();
        settingsPage.deleteAllContent();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
        dashboard.navigate();
    });

    describe('Escenarios Positivos', () => {
        it('F004E01.PA: ', () => {

        });
        it('F004E03.PA: ', () => {

        });
        it('F004E05.PA: ', () => {

        });
        it('F004E07.PA: ', () => {

        });
    });

    describe('Escenarios Negativos', () => {
        it('F004E02.PA: ', () => {

        });
        it('F004E04.PA: ', () => {

        });
        it('F004E06.PA: ', () => {

        });
        it('F004E08.PA: ', () => {

        });
    });

});