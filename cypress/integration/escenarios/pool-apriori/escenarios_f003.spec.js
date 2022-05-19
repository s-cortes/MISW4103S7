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
 * F003: Creación de Tags
 */
describe('Funcionalidad F003: Creación de Tags', () => {

    before(() => {
        faker.seed(10003);
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
        it('F003E01.PA: ', () => {

        });
        it('F003E03.PA: ', () => {

        });
        it('F003E05.PA: ', () => {

        });
        it('F003E07.PA: ', () => {

        });
    });

    describe('Escenarios Negativos', () => {
        it('F003E02.PA: ', () => {

        });
        it('F003E04.PA: ', () => {

        });
        it('F003E06.PA: ', () => {

        });
        it('F003E08.PA: ', () => {

        });
    });

});