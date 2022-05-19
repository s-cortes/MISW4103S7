import { adminUrls } from "../../../fixtures/urls";

export class Article {
    navigateToArticle(slug) {
        cy.visit(`${userUrls.homeUrl}/${slug}`);
        cy.wait(300);
    }
    readTitle(callback) {
        cy.get('header.article-header > h1.article-title')
            .invoke('text').then(val => callback(val));
    }
    readContent(callback) {
        cy.get('section.gh-content > p')
            .each(($p, index, $list) => {
                cy.wrap($p).invoke('text').then(txt => callback(txt));
            });
    }
}