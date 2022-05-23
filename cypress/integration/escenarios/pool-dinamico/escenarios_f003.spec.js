const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Tag } from "../../pages/admin/tag";
import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";
import { MockarooManager, SCHEMAS } from "../../generator/mockaroo_manager";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const login = new Login();
const tag = new Tag();

const tagPositiveManager = new MockarooManager(5, SCHEMAS.tagsPositive);
const tagNegativeManager = new MockarooManager(5, SCHEMAS.tagsNegative);
let tagsPositivePool = [];
let tagsNegativePool = [];


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
        before(async () => {
            tagsPositivePool = await tagPositiveManager.generareDataPool();
            console.log(tagsPositivePool);
        });

        after(() => {
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });

        it('F003E01.PD: ', () => {
            //Creación de un tag con nombre, slug, descripción y color correctos
            // GIVEN (additional to the login)

            tagsPositivePool.forEach(tagPoolObj => {                
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;
                //Get a TagDescription
                let description = tagPoolObj.description;
                //Get a TagSlug
                let slug = tagPoolObj.slug;
                //Get a TagColor
                let color = tagPoolObj.color;

                console.log('name: ' + tagPoolObj.name);

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);
                
                //Set TagDescription
                tag.WriteTagDesc(description);

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();

                //And Confirm the tag name and description are equals to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    tag.readTagName((txt) => expect(txt).to.equal(name));
                });
            });
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });
        it('F003E03.PD: ', () => {
            //Creación de un tag con nombre, slug, descripción y color correctos
            // GIVEN (additional to the login)

            tagsPositivePool.forEach(tagPoolObj => {
                console.log(tagPoolObj);
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;

                //Get a TagColor
                let color = tagPoolObj.color.replace('#', '');

                console.log('name: ' + tagPoolObj.name);

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);
                
                //Set TagColor
                tag.WriteTagColor(color);

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();


                //And Confirm the tag name and description are equals to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    //tag.readTagName((txt) => expect(txt).to.equal(name));
                    tag.readTagColor((txt) => expect(txt).to.equal(color));
                });
            });
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });
        it('F003E05.PD: ', () => {
            //Creación de un tag con nombre, slug, descripción y color correctos
            // GIVEN (additional to the login)

            tagsPositivePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;
                
                //Get a TagSlug
                let slug = tagPoolObj.slug.replaceAll(' ', '-');

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);
                
                //Set TagDescription
                tag.WriteTagSlug(slug);

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();

                //And Confirm the tag name and description are equals to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    //tag.readTagName((txt) => expect(txt).to.equal(name));
                    tag.readTagSlug((txt) => expect(txt).to.equal((name+slug).replaceAll(' ', '-')));
                });
            });
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });

        it('F003E07.PD: ', () => {
            //Creación de un tag con nombre y descripción correctos frontera positivo
            // GIVEN (additional to the login)

            tagsPositivePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;
                
                //Get a TagSlug
                let description = tagPoolObj.description;

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);
                
                //Set TagDescription
                tag.WriteTagDesc(description);

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();

                //And Confirm the tag name and description are equals to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    tag.readTagName((txt) => expect(txt).to.equal(name));
                    tag.readTagDesc((txt) => expect(txt).to.equal(description));
                });
            });
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });
    });

    describe('Escenarios Negativos', () => {
        it('F003E02.PD: ', () => {
            //Creación de un tag con nombre incorrectos prueba de fontera negativa
            // GIVEN (additional to the login)

            tagsNegativePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name.substring(0, 192);
                
                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);

                //Save the tag
                tag.saveTag();

                //Then check if exist an error
                tag.checkIfSaveErrorExists();

                dashboard.getTags();

                tag.LeaveTagWithError();

            });
        });
        it('F003E04.PD: ', () => {
            //Creación de un tag con color incorrectos
            // GIVEN (additional to the login)

            tagsNegativePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name.substring(0, 190);
                //Get a TagDescription
                let color = tagPoolObj.description.substring(1, 250);
                
                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);
                
                //Set TagColor
                tag.WriteTagColor(color);

                //Save the tag
                tag.saveTag();

                //Then check if exist an error
                tag.checkIfSaveErrorExists();

                dashboard.getTags();

                tag.LeaveTagWithError();
            });

        });
        it('F003E06.PD: ', () => {
            //Creación de un tag con slug incorrectos
            // GIVEN (additional to the login)

            tagsNegativePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name.substring(0, 190);
                //Get a TagDescription
                let slug = tagPoolObj.slug.substring(1, 300);
                
                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);
                
                //Set TagSlug
                tag.WriteTagSlug(slug);

                //Save the tag
                tag.saveTag();

                //Then check if exist an error
                tag.checkIfSaveErrorExists();

                dashboard.getTags();

                tag.LeaveTagWithError();
            });
        });
        it('F003E08.PD: ', () => {
            //Creación de un tag con slug incorrectos
            // GIVEN (additional to the login)

            tagsNegativePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name.substring(0, 190);
                //Get a TagDescription
                let description = tagPoolObj.slug.substring(1, 501);
                
                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);
                
                //Set TagDescription
                tag.WriteTagDesc(description);

                //Save the tag
                tag.saveTag();

                //Then check if exist an error
                tag.checkIfSaveErrorExists();

                dashboard.getTags();

                tag.LeaveTagWithError();
            });
        });
    });

});