const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Page } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { pool as articlesPositivePool } from "../../../fixtures/positive/articles.json"
import { pool as articlesNegativePool} from "../../../fixtures/negative/articles.json"
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
        it('F002E01.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesPositivePool.forEach(articlePoolObj => {
                let url = articlePoolObj.url.replaceAll(' ', '-');

                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, and
                // publishes the page
                page.clickEditorSettingsToggle();
                page.writeUrlSlug(url);
                page.clickEditorSettingsToggle();

                // THEN after navegating to the page with the new slug,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                page.publishNow();
                article.navigateToArticle(url);
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
                article.readContent(prgh => expect(articlePoolObj.content).to.contain(prgh));
            });
        });
        it('F002E03.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesPositivePool.forEach(articlePoolObj => {
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes a new tag, and publishes the page
                let tag = articlePoolObj.tag.trim();
                page.clickEditorSettingsToggle();
                page.setTagPage(tag);
                page.clickEditorSettingsToggle();
                page.publishNow();
    
                // THEN he should be able to open the settings tab, and
                // the value in the tag input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.readTags((txt) => expect(txt.trim()).to.equal(tag));
            });
        });
        it('F002E05.PA: ', () => {
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
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.readExcerpt((txt) => expect(txt.trim()).to.equal(excerpt));
            });
        });
        it('F002E07.PA: ', () => {

            articlesPositivePool.forEach(articlePoolObj => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
            })

        });
        it('F002E09.PA: ', () => {

            articlesPositivePool.forEach(articlePoolObj => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })

        });
    });

    describe('Escenarios Negativos', () => {
        it('F002E02.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page, and writes a title and the content for the page
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                let url = articlePoolObj.url.replaceAll(' ', '-');

                page.navigateToEditor();
                page.writeTitle(posArticleObj.title);
                page.writeArticle(posArticleObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, consisting of
                // whitespaces, dashes, a combination of both, or an ampty string, and
                // publishes the page
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
        it('F002E04.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                page.navigateToEditor();
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes a new tag using whitespaces, special characters, and
                // 'naughty' characters, and publishes the page
                page.clickEditorSettingsToggle();
                page.setTagPage(articlePoolObj.tag.trim());
                page.clickEditorSettingsToggle();
    
                // THEN he should be able to write a title and the content
                // for the page, publish it, and the value in the tag input
                // should match the text that the admin previously wrote
                page.writeTitle(posArticleObj.title);
                page.writeArticle(posArticleObj.content);
                page.publishNow();

                page.clickEditorSettingsToggle();
                page.readTags((txt) => expect(txt.trim()).to.equal(articlePoolObj.tag.trim()));
            });
        });
        it('F002E06.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                page.navigateToEditor();
    
                // WHEN the admin opens the editor settings menu, and selects the
                // excerpt textarea and writes a new excerpt using special characters,
                // and 'naughty' characters, and publishes the page
                let excerpt = articlePoolObj.excerpt.trim();
                page.clickEditorSettingsToggle();
                page.writeExcerpt(excerpt);
                page.clickEditorSettingsToggle();
    
                // THEN he should be able to write a title and the content
                // for the page, publish it, and the value in the excerpt textarea
                // should match the text that the admin previously wrote
                page.writeTitle(posArticleObj.title);
                page.writeArticle(posArticleObj.content);
                page.publishNow();

                page.clickEditorSettingsToggle();
                page.readExcerpt((txt) => expect(txt.trim()).to.equal(excerpt));
            });
        });
        it('F002E08.PA: ', () => {

            articlesNegativePool.forEach((articlePoolObj, index) => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
            })

        });
        it('F002E10.PA: ', () => {
            articlesNegativePool.forEach((articlePoolObj, index) => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })
        });
    });

});