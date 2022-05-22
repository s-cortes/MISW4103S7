const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Tag } from "../../pages/admin/tag";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const tag = new Tag();
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
        it('F003E01.EA: ', () => { 
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.word();
            //Get a TagDescription
            let description = faker.lorem.paragraph();
            //Get a TagSlug
            let slug = faker.lorem.slug();
            //Get a TagColor
            let color = Math.floor(Math.random()*16777215).toString(16); //faker.providers.color(); //faker.Color.rgb_hex(); //commerce.color().replace('#', '');
            console.log('name: ' + name);
            console.log('description: ' + description);
            console.log('slug: ' + slug);
            console.log('color: ' + color);

            //When enter the tag info
            //Set TagName
            tag.WriteTagName(name);
            //Set TagDescription
            tag.WriteTagColor(color);
            //Set TagSlug
            tag.WriteTagSlug(slug);
            //Set TagColor
            tag.WriteTagDesc(description);

            //Save the tag
            tag.saveTag();

            //Then go to the tags list
            dashboard.getTags();

            //And Confirm the tag name
            tag.getTagFromListByName(name, (tItem) => {
                tItem.click();
                cy.wait(300);
                tag.ReadTagName((txt) => expect(txt).to.equal(name));
            })
        });

        it('F003E03.EA: ', () => {

        });
        it('F003E05.EA: ', () => {

        });
        it('F003E07.EA: ', () => {

        });
    });

    describe('Escenarios Negativos', () => {
        it('F003E02.EA: ', () => {
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.word(200);
            //Get a TagDescription
            let description = faker.lorem.paragraph();
            //Get a TagSlug
            let slug = faker.lorem.slug();
            //Get a TagColor
            let color = Math.floor(Math.random()*16777215).toString(16); //faker.providers.color(); //faker.Color.rgb_hex(); //commerce.color().replace('#', '');
            console.log('name: ' + name);
            console.log('description: ' + description);
            console.log('slug: ' + slug);
            console.log('color: ' + color);

            //When enter the tag info
            //Set TagName
            tag.WriteTagName(name);
            //Set TagDescription
            tag.WriteTagColor(color);
            //Set TagSlug
            tag.WriteTagSlug(slug);
            //Set TagColor
            tag.WriteTagDesc(description);

            //Save the tag
            tag.saveTag();

            //Then go to the tags list
            dashboard.getTags();

            //And Confirm the tag name
            tag.getTagFromListByName(name, (tItem) => {
                tItem.click();
                cy.wait(300);
                tag.ReadTagName((txt) => expect(txt).to.equal(name));
            })
        });
        it('F003E04.EA: ', () => {

        });
        it('F003E06.EA: ', () => {

        });
        it('F003E08.EA: ', () => {

        });
    });

});