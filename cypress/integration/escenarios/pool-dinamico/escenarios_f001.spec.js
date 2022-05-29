const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Post } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { MockarooManager, SCHEMAS } from "../../generator/mockaroo_manager";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const article = new Article();
const post = new Post();
const login = new Login();

const articlePositiveManager = new MockarooManager(5, SCHEMAS.articlesPositive);
const articleNegativeManager = new MockarooManager(5, SCHEMAS.articlesNegative);
let articlesPositivePool = [];
let articlesNegativePool = [];

/**
 * Agrupación de Escenarios por Funcionalidad
 * F001: Creación de Posts
 */
describe('Funcionalidad F001: Creación de Post', () => {

    before(() => {
        faker.seed(10001);
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

        it('F001E01.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            articlesPositivePool.forEach(articlePoolObj => {
                let url = articlePoolObj.url.trim().replaceAll(' ', '-');

                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, and
                // publishes the post
                post.clickEditorSettingsToggle();
                post.writeUrlSlug(url);
                post.clickEditorSettingsToggle();

                
                // THEN he should be able to publish the post, and
                // the value in the url slug input  should match the text that
                // the admin previously wrote
                post.publishNow();
                post.clickEditorSettingsToggle();
                post.readUrlSlug(txt => expect(txt).to.equal(url));
            });
        });
        it('F001E03.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            articlesPositivePool.forEach(articlePoolObj => {
                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes multiple tags, and publishes the post
                let tags = articlePoolObj.tag.split(' ');
                post.clickEditorSettingsToggle();
                tags.forEach(t => post.writeTagPageWithoutClearingInput(t));
                post.clickEditorSettingsToggle();
                post.publishNow();
    
                // THEN he should be able to open the settings tab, and
                // the value in the tag input  should match the text that
                // the admin previously wrote
                post.clickEditorSettingsToggle();
                post.readTags((txt) => expect(tags).to.contain(txt.trim()));
            });
        });
        it('F001E05.PD: ', () => {

        });
        it('F001E07.PD: ', () => {

        });
        it('F001E09: ', () => {

            articlesPositivePool.forEach(articlePoolObj => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a post, and writes a title and the content for the post
                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);

                //WHEN the admin publishes the post now
                post.publishNow();

                // THEN after navegating to the new post,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                article.navigateToArticleByTitle(articlePoolObj.title);
                cy.wait(300);
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })

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

        it('F001E02.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                let url = articlePoolObj.url.trim().replaceAll(' ', '-');

                post.navigateToEditor();
                post.writeTitle(posArticleObj.title);
                post.writeArticle(posArticleObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, with the number
                // of characters varying near the DB colum's limit, and publishes the post
                post.clickEditorSettingsToggle();
                post.writeUrlSlug(url);
                post.clickEditorSettingsToggle();

                // THEN after navegating to the post with the new slug,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                post.publishNow();
                article.navigateToArticle(url);
                article.readTitle((txt) => expect(txt).to.equal(posArticleObj.title));
                article.readContent(prgh => expect(posArticleObj.content).to.contain(prgh));
            });
        });
        it('F001E04.PD: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                post.navigateToEditor();
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes a new tag with the number of characters
                // varying near the DB colum's limit, and publishes the post
                post.clickEditorSettingsToggle();
                post.setTagPage(articlePoolObj.tag.trim());
                post.clickEditorSettingsToggle();
    
                // THEN he should be able to write a title and the content
                // for the post and publish it
                post.writeTitle(posArticleObj.title);
                post.writeArticle(posArticleObj.content);
                post.publishNow();

                post.clickEditorSettingsToggle();
                post.readTags((txt) => expect(txt.trim()).to.equal(articlePoolObj.tag.trim()));
            });
        });
        it('F001E06.PD: ', () => {

        });
        it('F001E08.PD: ', () => {

        });
        it('F001E12: ', () => {

            articlesNegativePool.forEach((articlePoolObj, index) => {
                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);

                //WHEN the admin publishes the post now
                post.publishNow();

                // THEN after navegating to the new post,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                article.navigateToArticleByTitle(articlePoolObj.title);
                cy.wait(300);
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })

        });
    });

});