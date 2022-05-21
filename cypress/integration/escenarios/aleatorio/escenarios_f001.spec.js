const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Post } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const article = new Article();
const post = new Post();
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
        it('F001E01.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // URL input to erase it an and writes a new url slug
            let slug = faker.lorem.slug();
            post.clickEditorSettingsToggle();
            post.writeUrlSlug(slug);
            post.clickEditorSettingsToggle();
            post.publishNow();
            
            // THEN after navegating to the post with the new slug,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticle(slug);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
        it('F001E03.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // tag input and writes a new tag, and publishes the post
            let tag = faker.lorem.word();
            post.clickEditorSettingsToggle();
            post.setTagPage(tag);
            post.clickEditorSettingsToggle();
            post.publishNow();

            // THEN he should be able to open the settings tab, and
            // the value in the tag input  should match the text that
            // the admin previously wrote
            post.clickEditorSettingsToggle();
            post.readTags((txt) => expect(txt.trim()).to.equal(tag));
        });
        it('F001E05.EA: ', () => {

        });
        it('F001E07.EA: ', () => {

        });
        it('F001E09.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            //WHEN the admin publishes the post now
            post.publishNow();

            // THEN after navegating to the new post,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticleByTitle(title);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
    });

    describe('Escenarios Negativos', () => {
        it('F001E02.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // URL input to erase it an and writes a new url slug, and
            // publishes the post
            let slug = faker.lorem.slug(50);
            post.clickEditorSettingsToggle();
            post.writeUrlSlug(slug);
            post.clickEditorSettingsToggle();
            post.publishNow();

            // THEN after navegating to the post with the new slug,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticle(slug);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
        it('F001E04.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post
            post.navigateToEditor();

            // WHEN the admin opens the editor settings menu, and selects the
            // tag input and writes a new tag, and publishes the post
            let tag = ',' + faker.lorem.word();
            post.clickEditorSettingsToggle();
            post.setTagPage(tag);
            post.clickEditorSettingsToggle();

            // THEN he should be able to write a title and the content
            // for the post and publish it
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            post.publishNow();
            post.clickEditorSettingsToggle();
            post.readTags((txt) => expect(txt.trim()).to.equal(tag));
        });
        it('F001E06.EA: ', () => {

        });
        it('F001E08.EA: ', () => {

        });
        it('F001E10.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs(50000);
            post.writeTitle(title);
            post.writeArticle(paragraph);

            //WHEN the admin publishes the post now
            post.publishNow();

            // THEN after navegating to the new post,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticleByTitle(title);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
    });

});