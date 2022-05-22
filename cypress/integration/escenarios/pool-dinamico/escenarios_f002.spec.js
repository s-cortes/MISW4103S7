const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Page } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { MockarooManager, SCHEMAS } from "../../generator/mockaroo_manager";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const article = new Article();
const page = new Page();
const login = new Login();

const articlePositiveManager = new MockarooManager(5, SCHEMAS.articlesPositive);
const articleNegativeManager = new MockarooManager(5, SCHEMAS.articlesNegative);
let articlesPositivePool = [];
let articlesNegativePool = [];


/**
 * Agrupación de Escenarios por Funcionalidad
 * F002: Creación de Pages
 */
describe('Funcionalidad F002: Creación de Pages', () => {

    before(() => {
        faker.seed(10002);
        login.login(adminEmail, adminPassword);
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
        dashboard.navigate();
    });

    describe('Escenarios Positivos', () => {

        before(async () => {
            articlesPositivePool = await articlePositiveManager.generareDataPool();
        });

        after(() => {
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });

        it('F002E01.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesPositivePool.forEach(articlePoolObj => {
                let url = articlePoolObj.url.trim().replaceAll(' ', '-');

                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, and
                // publishes the page
                page.clickEditorSettingsToggle();
                page.writeUrlSlug(url);
                page.clickEditorSettingsToggle();
                page.publishNow();

                
                // THEN the value in the url slug input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.readUrlSlug(txt => expect(txt).to.equal(url));
            });
        });
        it('F002E03.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesPositivePool.forEach(articlePoolObj => {
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes multiple tags, and publishes the page
                let tags = articlePoolObj.tag.split(' ');
                page.clickEditorSettingsToggle();
                tags.forEach(t => page.writeTagPageWithoutClearingInput(t));
                page.clickEditorSettingsToggle();
                page.publishNow();
    
                // THEN he should be able to open the settings tab, and
                // the value in the tag input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.readTags((txt) => expect(tags).to.contain(txt.trim()));
            });
        });
        it('F002E05.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesPositivePool.forEach(articlePoolObj => {
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);
    
                // WHEN the admin opens the editor settings menu, and selects the
                // excerpt textarea and writes a new excerpt, and publishes the page
                let excerpt = articlePoolObj.excerpt.trim();
                page.clickEditorSettingsToggle();
                page.writeExcerpt(excerpt);
                page.clickEditorSettingsToggle();
                page.publishNow();
    
                // THEN he should be able to open the settings tab, and
                // the value in the excerpt textarea should match the text that
                // the admin previously wrote, and after editing the excerpt and
                // re-publishing the poist, the new excerpt should change
                page.clickEditorSettingsToggle();
                page.readExcerpt((txt) => expect(txt.trim()).to.equal(excerpt));
                page.clickEditorSettingsToggle();

                page.unPublish();
                page.clickEditorSettingsToggle();
                page.writeExcerpt(articlePoolObj.title);
                page.clickEditorSettingsToggle();
                page.publishNow();

                page.clickEditorSettingsToggle();
                page.readExcerpt((txt) => expect(txt.trim()).to.equal(articlePoolObj.title));
            });
        });
        it('F002E07.PD: ', () => {

        });
        it('F002E09.PD: ', () => {

        });
    });

    describe('Escenarios Negativos', () => {

        before(async () => {
            articlesPositivePool = await articlePositiveManager.generareDataPool();
            articlesNegativePool = await articleNegativeManager.generareDataPool();
        });

        after(() => {
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });

        it('F002E02.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                let url = articlePoolObj.url.trim().replaceAll(' ', '-');

                page.navigateToEditor();
                page.writeTitle(posArticleObj.title);
                page.writeArticle(posArticleObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, with the number
                // of characters varying near the DB colum's limit, publishes the page
                page.clickEditorSettingsToggle();
                page.writeUrlSlug(url);
                page.clickEditorSettingsToggle();

                // THEN after navegating to the page with the new slug,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                page.publishNow();
                article.navigateToArticle(url);
                article.readTitle((txt) => expect(txt).to.equal(posArticleObj.title));
                article.readContent(prgh => expect(posArticleObj.content).to.contain(prgh));
            });
        });
        it('F002E04.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                page.navigateToEditor();
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes a new tag with the number of characters
                // varying near the DB colum's limit, and publishes the page
                page.clickEditorSettingsToggle();
                page.setTagPage(articlePoolObj.tag.trim());
                page.clickEditorSettingsToggle();
    
                // THEN he should be able to write a title and the content
                // for the page and publish it
                page.writeTitle(posArticleObj.title);
                page.writeArticle(posArticleObj.content);
                page.publishNow();

                page.clickEditorSettingsToggle();
                page.readTags((txt) => expect(txt.trim()).to.equal(articlePoolObj.tag.trim()));
            });
        });
        it('F002E06.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];

                page.navigateToEditor();
                page.writeTitle(posArticleObj.title);
                page.writeArticle(posArticleObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // excerpt textarea and writes a new excerpt, with the number of
                // characters varying near the DB colum's limit, and publishes the page
                let excerpt = articlePoolObj.excerpt.trim();
                page.clickEditorSettingsToggle();
                page.writeExcerpt(excerpt);
                page.clickEditorSettingsToggle();
                page.publishNow();
    
                // THEN he should be able to open the settings tab, and
                // the value in the excerpt textarea should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.readExcerpt((txt) => expect(txt.trim()).to.equal(excerpt));
            });
        });
        it('F002E08.PD: ', () => {

        });
        it('F002E10.PD: ', () => {

        });
    });

});