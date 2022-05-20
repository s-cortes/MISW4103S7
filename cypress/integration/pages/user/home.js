import { userUrls } from "../../../fixtures/urls";

export class UserHomePage {
    navigate() {
        cy.visit(userUrls.homeUrl);
        cy.wait(300);
    }
    getFirstPostByTitle(title, callback) {
        let postItem = cy.contains('a.post-card-content-link', title).first();
        callback(postItem);
    }
    getFirstPostByExcerpt(excerpt, callback) {
        let postItem = cy.contains('a.post-card-content-link', excerpt).first();
        callback(postItem);
    }
    hasPostsInList() {
        let contentList = cy.get('div.post-feed');
        return contentList.find('article').length > 0;
    }
    getPostListItems(callback) {
        cy.get('article.post-card')
            .each(($p, index, $list) => callback($p, index, $list));
    }
    findTitleOnPostItem(pItem, callback) {
        cy.wrap(pItem).find('h2.post-card-title')
            .invoke('text').then(val => callback(val));
    }
}