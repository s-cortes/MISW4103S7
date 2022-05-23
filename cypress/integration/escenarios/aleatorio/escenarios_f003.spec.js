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
            faker.seed(10003);
            //Creación de un tag con nombre, descripción y Slug validación de nombre
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

            //When enter the tag info
            //Set TagName
            tag.WriteTagName(name);

            //Set TagSlug
            tag.WriteTagSlug(slug);

            //Set TagDescription
            tag.WriteTagDesc(description);

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

        it('F003E03.EA: ', () => {
            faker.seed(10004);
            //Creación de un tag con nombre, descripción y Slug  validación de slug
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
            console.log('slug: ' + slug);

            //When enter the tag info
            //Set TagName
            name = tag.WriteTagName(name);

            //Set TagSlug
            slug = tag.WriteTagSlug(slug);

            //Set TagDescription
            description = tag.WriteTagDesc(description);

            //Save the tag
            tag.saveTag();

            //Then go to the tags list
            dashboard.getTags();

            //And Confirm the tag name is equal to the saved tag
            tag.getTagFromListByName(name, (tItem) => {
                tItem.click();
                cy.wait(300);
                tag.readTagSlug((txt) => expect(txt).to.equal(name+slug));
            });
        });

        it('F003E05.EA: ', () => {
            faker.seed(10005);
            //Creación de un tag con nombre, color, descripción y Slug  validación de color
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.word();
            
            //Get a TagColor
            const color = Math.floor(Math.random()*16777215).toString(16);

            //When enter the tag info
            //Set TagName
            name = tag.WriteTagName(name);

            //Set TagColor
            tag.WriteTagColor(color);            

            //Save the tag
            tag.saveTag();

            //Then go to the tags list
            dashboard.getTags();

            //And Confirm the tag name is equal to the saved tag
            tag.getTagFromListByName(name, (tItem) => {
                tItem.click();
                cy.wait(300);
                tag.readTagColor((txt) => expect(txt.replace('#', '')).to.equal(color));
            });
        });

        it('F003E07.EA: ', () => {
            faker.seed(10006);
            //Creación de un tag con nombre,  descripción   validación de la descripción
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.word();
            
            //Get a description
            let description = faker.lorem.paragraph();
            
            //When enter the tag info
            //Set TagName
            tag.WriteTagName(name);

            //Set Tagdescription
            tag.WriteTagDesc(description);            

            //Save the tag
            tag.saveTag();

            //Then go to the tags list
            dashboard.getTags();

            //And Confirm the tag name is equal to the saved tag
            tag.getTagFromListByName(name, (tItem) => {
                tItem.click();
                cy.wait(300);
                tag.readTagDesc((txt) => expect(txt).to.equal(description));
            });
        });
    });

    describe('Escenarios Negativos', () => {
        it('F003E02.EA: ', () => {
            //Creación de un tag con nombre con mas de 191 caracteres validación error por nombre
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.paragraphs();
            //Get a TagColor
            let color = Math.floor(Math.random()*16777215).toString(16); //faker.providers.color(); //faker.Color.rgb_hex(); //commerce.color().replace('#', '');
            //Get a TagSlug
            let slug = faker.lorem.slug();
            //Get a TagDescription
            let description = faker.lorem.paragraph();
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
            
            //Then show error button
            tag.checkIfSaveErrorExists();
            
        });
        it('F003E04.EA: ', () => {
            //Creación de un tag con formato de color erroneo validación error por color
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.word();
            //Get a TagColor
            let color = faker.commerce.color().replace('#', '');
            //Get a TagSlug
            let slug = faker.lorem.slug();
            //Get a TagDescription
            let description = faker.lorem.paragraph();            

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
            
            //Then show error button
            tag.checkIfSaveErrorExists();
        });
        it('F003E06.EA: ', () => {
            //Creación de un tag con slug con mas de 191 caracteres validación error por slug
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.word();

            //Get a TagSlug
            let slug = faker.lorem.paragraph();
            slug.replace(' ', '-');
           
            //Get a TagDescription
            let description = faker.lorem.paragraph();
            console.log('name: ' + name);
            console.log('slug: ' + slug);

            //When enter the tag info
            //Set TagName
            tag.WriteTagName(name);
            
            //Set TagSlug
            tag.WriteTagSlug(slug);

            //Save the tag
            tag.saveTag();
            
            //Then show error button
            tag.checkIfSaveErrorExists();
        });
        it('F003E08.EA: ', () => {
            //Creación de un tag con descripción con mas de 500 caracteres validación error por slug
            // GIVEN (additional to the login)

            //Create a Tag
            dashboard.getTags();
            tag.createNewTag();

            //Get a TagName
            let name = faker.lorem.word();

            //Get a TagDescription
            let description = faker.lorem.paragraphs();
            console.log('name: ' + name);
            console.log('description: ' + description);
            console.log('slug: ' + slug);
            console.log('color: ' + color);

            //When enter the tag info
            //Set TagName
            tag.WriteTagName(name);
            
            //Set TagSlug
            tag.WriteTagSlug(slug);

            //Save the tag
            tag.saveTag();
            
            //Then show error button
            tag.checkIfSaveErrorExists();
        });
    });

});