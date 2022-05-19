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
 * F002: Creación de Pages
 */
describe('Funcionalidad F002: Creación de Pages', () => {

    before(() => {
        faker.seed(10002);
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
        it('F002E01.EA: ', () => {

        });
        it('F002E03.EA: ', () => {

        });
        it('F002E05.EA: ', () => {

        });
        it('F002E07.EA: ', () => {

        });
        it('F002E09.EA: ', () => {

        });
    });

    describe('Escenarios Negativos', () => {
        it('F002E02.EA: ', () => {

        });
        it('F002E04.EA: ', () => {

        });
        it('F002E06.EA: ', () => {

        });
        it('F002E08.EA: ', () => {

        });
        it('F002E10.EA: ', () => {

        });
    });

});