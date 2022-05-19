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
 * F001: Creación de Posts
 */
describe('Funcionalidad F001: Creación de Post', () => {

    before(() => {
        faker.seed(10001);
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
        it('F001E01.PD: ', () => {

        });
        it('F001E03.PD: ', () => {

        });
        it('F001E05.PD: ', () => {

        });
        it('F001E07.PD: ', () => {

        });
        it('F001E09.PD: ', () => {

        });
    });

    describe('Escenarios Negativos', () => {
        it('F001E02.PD: ', () => {

        });
        it('F001E04.PD: ', () => {

        });
        it('F001E06.PD: ', () => {

        });
        it('F001E08.PD: ', () => {

        });
        it('F001E10.PD: ', () => {

        });
    });

});