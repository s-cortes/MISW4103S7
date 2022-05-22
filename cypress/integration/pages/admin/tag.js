import { adminUrls } from "../../../fixtures/urls";

export class Tag {
    navigateToTags() {
        cy.visit(adminUrls.tagUrls.listUrl);
        cy.wait(300);
    }
    createNewTag() {
        cy.get('a.ember-view[href="#/tags/new/"]').first().click();
        cy.wait(300);
    }
    WriteTagName(name) {
        cy.get('#tag-name').type(name);
        cy.wait(300);
        return name;
    }    
    WriteTagDesc(desc) {
        cy.get('#tag-description').type(desc)
            .invoke('text', desc);
        cy.wait(300);
        return desc;
    }
    WriteTagSlug(slug) {
        cy.get('input[name="slug"]').type(slug);
        cy.wait(300);
        return slug;
    }
    WriteTagColor(color) {
        cy.get('div.input-color > input').type(color);
        cy.wait(300);
        return color;
    }
    ReadTagName(callback) {
        cy.get('div.gh-tag-settings-multiprop > div > input').invoke('val')
        .then(val => callback(val));
    }
    readTagDesc(callback) {
        cy.get('#tag-description').invoke('text').then(val => callback(val));
    }
    getTagFromListByName(name, callback) {
        let tagItem = cy.contains('li', name).first();
        callback(tagItem);
    }
    saveTag() {
        cy.get('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]').click();
        cy.wait(300);
    }
}
