const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { Page } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";
import { SettingsPage } from "../../pages/admin/settings";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const article = new Article();
const page = new Page();
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
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            page.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin publishes the page, and opens the editor settings
            // menu, and selects the URL input to erase the default value,
            // and writes a new url slug and re-publishes the page
            page.publishNow();

            let slug = faker.lorem.slug();
            page.clickEditorSettingsToggle();
            page.writeUrlSlug(slug);
            page.clickEditorSettingsToggle();

            page.unPublish();
            page.publishNow();
            
            // THEN after navegating to the page with the new slug,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticle(slug);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
        it('F002E03.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            page.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin publishes the page, and opens the editor settings
            // menu, and selects the  tag input and writes a new tag, and 
            // re-publishes the page
            page.publishNow();

            let tag = faker.lorem.word();
            page.clickEditorSettingsToggle();
            page.setTagPage(tag);
            page.clickEditorSettingsToggle();

            page.unPublish();
            page.publishNow();

            // THEN he should be able to open the settings tab, and
            // the value in the tag input should match the text that
            // the admin previously wrote
            page.clickEditorSettingsToggle();
            page.readTags((txt) => expect(txt.trim()).to.equal(tag));
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
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            page.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // URL input to erase it and writes a new url slug with more characters
            // than the DB limit, and publishes the page
            let slug = faker.lorem.slug(50);
            page.clickEditorSettingsToggle();
            page.writeUrlSlug(slug);
            page.clickEditorSettingsToggle();
            page.publishNow();

            // THEN the page editor should show a publication error alert
            // indicating that it was not possible to publish the page
            page.checkIfPublishErrorExists();
        });
        it('F002E04.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            page.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // tag input and writes a new tag with a comman at the begining of
            // the word, and publishes the page
            let tag = ',' + faker.lorem.word();
            page.clickEditorSettingsToggle();
            page.setTagPage(tag);
            page.clickEditorSettingsToggle();

            // THEN the page editor should show a publication error alert
            // indicating that it was not possible to publish the page
            page.checkIfPublishErrorExists();
        });
        it('F002E06.EA: ', () => {

        });
        it('F002E08.EA: ', () => {

        });
        it('F002E10.EA: ', () => {

        });
    });

});