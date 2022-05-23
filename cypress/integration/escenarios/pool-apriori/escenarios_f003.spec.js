const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Tag } from "../../pages/admin/tag";

import { pool as tagsPositivePool } from "../../../fixtures/positive/tags.json"
import { pool as tagsNegativePool} from "../../../fixtures/negative/tags.json"
import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const login = new Login();
const tag = new Tag();


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
        //Creación de un tag con nombre y metaTitle correctos
        it('F003E01.PA: ', () => {
            // GIVEN (additional to the login)

            tagsPositivePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();

                //And Confirm the tag name is equal to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    tag.readTagName((txt) => expect(txt).to.equal(name));
                });
            });
        });
        it('F003E03.PA: ', () => {
            // GIVEN (additional to the login)

            tagsPositivePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                //tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;
                let color;

                //When enter the tag info
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    //Get a TagColor
                    color = tagPoolObj.color.replace('#', '');
                    //Set TagColor
                    tag.WriteTagColor(color);
                });

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();

                //And Confirm the tag name is equal to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    tag.readTagColor((txt) => expect(txt).to.equal(color));
                });
            });
        });

        it('F003E05.PA: ', () => {
            // GIVEN (additional to the login)

            tagsPositivePool.forEach((tagPoolObj) => {
                //Create a Tag
                dashboard.getTags();
                //tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;
                let slug;
                //When enter the tag info
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    //Get a TagSlug
                    slug = tagPoolObj.slug.replace(' ', '-');
                    //Set TagSlug
                    tag.WriteTagSlug(slug);
                });

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();

                //And Confirm the tag name is equal to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    tag.readTagSlug((txt) => expect(txt).to.equal((name+slug).replaceAll(' ', '-')));
                });
            });
        });
        it('F003E07.PA: ', () => {
            // GIVEN (additional to the login)

            tagsPositivePool.forEach(tagPoolObj => {
                //Create a Tag
                dashboard.getTags();
                //tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;
                let description;
                //When enter the tag info
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    //Get a TagSlug
                    description = tagPoolObj.description;
                    //Set TagSlug
                    tag.WriteTagDesc(description);
                });

                //Save the tag
                tag.saveTag();

                //Then go to the tags list
                dashboard.getTags();

                tag.getInternalTags()

                //And Confirm the tag name is equal to the saved tag
                tag.getTagFromListByName(name, (tItem) => {
                    tItem.click();
                    cy.wait(300);
                    tag.readTagDesc((txt) => expect(txt).to.equal(description));
                });
            });
        });
    });

    describe('Escenarios Negativos', () => {
        it('F003E02.PA: ', () => {
            //Creación de un tag con nombre y metaTitle incorrectos
            // GIVEN (additional to the login)

            tagsNegativePool.forEach(tagPoolObj  => {
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObj.name;
                //Get a TagDescription

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
        it('F003E04.PA: ', () => {
            //Creación de un tag con nombre y descripción aumentando caracteres, prueba de frontera positiva y negativa
            
            var inicialSubstring = 501;

            tagsNegativePool.forEach((tagPoolObj, index) => {
                let tagPoolObjPos = tagsPositivePool[index];
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObjPos.name;

                //Get a TagDescription
                let description = tagPoolObj.description.substring(0, inicialSubstring);

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);

                //Set TagDescription
                tag.WriteTagDesc(description);

                //Save the tag
                tag.saveTag();

                //Then check if exist an error
                tag.checkIfSaveErrorExists();

                //Then go to the tags list
                dashboard.getTags();
                
                tag.LeaveTagWithError();

                inicialSubstring += 1;
            });

        });
        it('F003E06.PA: ', () => {
            //Creación de un tag con nombre y descripción aumentando caracteres, prueba de frontera positiva y negativa

            tagsNegativePool.forEach((tagPoolObj, index) => {
                let tagPoolObjPos = tagsPositivePool[index];

                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObjPos.name;

                //Get a TagDescription
                let color = tagPoolObj.color;

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);

                //Set TagDescription
                tag.WriteTagColor(color);

                //Save the tag
                tag.saveTag();

                //Then check if exist an error
                tag.checkIfSaveErrorExists();

                //Then go to the tags list
                dashboard.getTags();
                
                tag.LeaveTagWithError();
            });
        });
        it('F003E08.PA: ', () => {
            //Creación de un tag con nombre y descripción aumentando caracteres, prueba de frontera positiva y negativa

            tagsNegativePool.forEach((tagPoolObj, index) => {
                let tagPoolObjPos = tagsPositivePool[index];
                //Create a Tag
                dashboard.getTags();
                tag.createNewTag();

                //Get a TagName
                let name = tagPoolObjPos.name;

                //Get a TagDescription
                let slug = tagPoolObj.slug;

                //When enter the tag info
                //Set TagName
                tag.WriteTagName(name);

                //Set TagDescription
                tag.WriteTagSlug(slug);

                //Save the tag
                tag.saveTag();

                //Then check if exist an error
                tag.checkIfSaveErrorExists();

                //Then go to the tags list
                dashboard.getTags();
                
                tag.LeaveTagWithError();
            });
        });
    });

});