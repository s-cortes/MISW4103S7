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
    readTagName(callback) {
        cy.get('#tag-name').invoke('val')
        .then(val => callback(val));
        cy.wait(300);
    }
    readTagColor(callback) {
        cy.get('div.input-color > input').invoke('val')
        .then(val => callback(val));
        cy.wait(300);
    }
    readTagSlug(callback) {
        cy.get('input[name="slug"]').invoke('val')
        .then(val => callback(val));
        cy.wait(300);
    }
    readTagDesc(callback) {
        cy.get('#tag-description').invoke('val').then(val => callback(val));
        cy.wait(300);
    }
    getTagFromListByName(name, callback) {
        let tagItem = cy.get('ol[class="tags-list gh-list "]').contains('h3', name).first();
        callback(tagItem);
        cy.wait(300);
    }
    getInternalTags(){
        cy.get('div[class="gh-contentfilter gh-btn-group"] > button:nth-child(2)').first().click();
        cy.wait(300);
    }
    saveTag() {
        cy.get('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]').click();
        cy.wait(300);
    }
    checkIfSaveErrorExists() {
        return expect(cy.get('.retry_svg__retry-animated')).to.exist;
    }
    LeaveTagWithError() {
        cy.get('div.modal-footer > button.gh-btn-red').click();
        cy.wait(300);
    }
}
