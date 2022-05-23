import { adminUrls } from "../../../fixtures/urls";

class Editor {

    navigateToEditor() {
        cy.visit(`${adminUrls.editorUrl}/${this.editPage.toLowerCase()}`);
        cy.wait(300);
    }
    exitEditorWithBackButton() {
        cy.get('a.gh-editor-back-button').click();
        cy.wait(300);
    }
    // Article (Page/Post) Content edition --------------------------------------------------------
    writeTitle(title) {
        cy.get('textarea.gh-editor-title').type(title);
        cy.wait(300);
        return title;
    }
    readTitle(callback) {
        cy.get('textarea.gh-editor-title').val(val => callback(val));
    }
    writeArticle(content) {
        cy.get('article.koenig-editor > div > div > p')
            .invoke('text', content);
        return content;
    }
    readArticle(callback) {
        cy.get('article.koenig-editor > div > div > p')
            .invoke('text').then(txt => callback(txt));
    }
    // Article (Page/Post) Publication ------------------------------------------------------------
    #clickPublishButton() {
        cy.get('div.gh-publishmenu-trigger').click();
        cy.wait(300);
    }
    #clickOnFirstPublishOption() {
        cy.get('div.gh-publishmenu-radio').first().click();
        cy.wait(300);
    }
    #clickPublishOptionConfirmation() {
        cy.get('button.gh-publishmenu-button').click();
        cy.wait(1000);
    }
    #clickPublishModalConfirmation() {
        cy.get('div.modal-content > div.modal-footer > button.gh-btn-black')
            .click();
        cy.wait(300)
    }
    publishNow() {
        this.#clickPublishButton();
        this.#clickOnFirstPublishOption();
        this.#clickPublishOptionConfirmation();

        if(this.editPage === 'Post'){
            // Page Editor no requiere confirmación
            this.#clickPublishModalConfirmation()
        }
    }
    #clickPublishModalConfirmationNoPic() {
        cy.get('div.modal-content > div.modal-footer > button.gh-btn-black')
            .click();
        cy.wait(300)
    }

    publishNowNoPic() {
        this.#clickPublishButton();
        this.#clickOnFirstPublishOption();
        this.#clickPublishOptionConfirmation();

        if(this.editPage === 'Post'){
            // Page Editor no requiere confirmación
            this.#clickPublishModalConfirmationNoPic()
        }
    }

    #publishOnSchedule() {
        cy.contains('div.gh-publishmenu-radio', "Schedule it for later").first().click();
        cy.wait(300);
    }
    #setPublishingDate(publishingDate) {
        cy.get('div.gh-date-time-picker-time > input').clear().type(publishingDate);
        cy.wait(300);
    }
    #setSheduleForLaterDate(timeString, shouldFail) {
        let hours = timeString.split(':');
        let actualDate = new Date(Date.UTC(2020, 0, 1, hours[0], hours[1], 0));
        let newDateMilli = actualDate.getTime();
        newDateMilli = shouldFail ? newDateMilli - (3*60000) : newDateMilli + (3*60000);
        let scheduledDate = new Date(newDateMilli);
        cy.wait(500);
        let hplusm = scheduledDate.getUTCHours() + ':' + scheduledDate.getUTCMinutes();
        return hplusm;
    }
    getTimeErrorPost(callback){
        cy.get('div.gh-date-time-picker-error').first().then((item => callback(item)));
    }

    publishScheduleForLater(shouldFail=false) {
        this.#clickPublishButton();
        this.#publishOnSchedule();

        this.#clickPublishOptionConfirmation();

        if(this.editPage === 'post' && !shouldFail){
            // Page Editor no requiere confirmación
            this.#clickPublishModalConfirmationNoPic();
        }
    }

    unPublish() { 
        this.#clickPublishButton();
        this.#clickOnFirstPublishOption();
        this.#clickPublishOptionConfirmation();
        this.#clickPublishButton();
    }

    checkIfPublishErrorExists() {
        expect(cy.get('.gh-alerts').find('.gh-alert')).to.exist;
    }

    // Article (Page/Post) Preview ----------------------------------------------------------------
    getPreview(){
        cy.get('button[class="gh-btn gh-editor-preview-trigger"]').click();
        cy.wait(300);
    }
    getPreviewContent(title, callback) {
        let previewItem = cy.get('iframe.gh-pe-iframe').first().its('0');
        callback(previewItem);
    }
    exitPriview(){
        cy.get('button.gh-editor-back-button').click();
        cy.wait(300);
    }
    // Article (Page/Post) Settings ---------------------------------------------------------------
    clickEditorSettingsToggle() {
        cy.get('button.settings-menu-toggle').click();
        cy.wait(300);
    }
    writeUrlSlug(slug) {
        cy.get('input.post-setting-slug').clear().type(slug, {force: true});
        cy.wait(300);
        return slug;
    }
    readUrlSlug(callback) {
        cy.get('input.post-setting-slug').invoke('val')
            .then(txt => callback(txt));
    }
    clickEditorSettingsView(){
        cy.get('a.post-view-link').click();
        cy.wait(300);
    }
    goToPagePublishFromSlug(){
        cy.get('p.ghost-url-preview').invoke('text').then(val => cy.visit(val));
        cy.wait(300)
    }
    setTagPage(tagName){
        cy.get('#tag-input').clear().type(tagName).type('{enter}');
        cy.wait(300);
    }
    writeTagPageWithoutClearingInput(tagName) {
        cy.get('#tag-input').type(tagName);
        cy.wait(500);
        cy.get('#tag-input').type('{enter}');
        cy.wait(500);
    }
    readTags(callback) {
        cy.get('li.tag-token').each(($p, index, $list) => {
            cy.wrap($p).invoke('text').then(txt => callback(txt));
        });
    }
    writeExcerpt(excerpt) {
        cy.get('textarea.post-setting-custom-excerpt')
            .clear().type(excerpt, {force: true});
        cy.wait(300);
        return excerpt;
    }
    readExcerpt(callback) {
        cy.get('textarea.post-setting-custom-excerpt').invoke('val')
            .then(txt => callback(txt));
    }
    deleteArticle() {
        cy.get('button.settings-menu-delete-button').then(btn => {
            cy.wrap(btn).click();
            cy.wait(1000);

            cy.get('div.modal-content > div.modal-footer > button.gh-btn-red')
            .click();
            cy.wait(300)
        });
    }
}

class Post extends Editor {
    editPage = 'Post';

    navigateToPosts() {
        cy.visit(adminUrls.postUrls.listUrl);
        cy.wait(300);
    }
    hasPostsInList() {
        let contentList = cy.get('ol.posts-list');
        return contentList.find('li').length > 0;
    }
    getPostListItems(callback) {
        cy.get('li.gh-posts-list-item')
            .each(($p, index, $list) => callback($p, index, $list));
    }
    findTitleOnPostItem(pItem, callback) {
        cy.wrap(pItem).find('h3.gh-content-entry-title')
            .invoke('text').then(txt => callback(txt));
    }
    getPostFromListByTitle(title, callback) {
        let postItem = cy.contains('li', title).first();
        callback(postItem);
    }
    goPostFromListByTitle(title) {
        cy.contains('h3.gh-content-entry-title', title).first().click();
        cy.wait(300);
    }
    getPostByTitleFromHome(title, callback) {
        let postItem = cy.contains('article', title).first();
        callback(postItem);
    }
}

class Page extends Editor {
    editPage = 'Page';

    navigateToPages() {
        cy.visit(adminUrls.pageUrls.listUrl);
        cy.wait(300);
    }
    createNewPage() {
        cy.get('a.ember-view[href="#/editor/page/"]').first().click();
        cy.wait(300);
    }
    getListItems(callback) {
        cy.get('li.gh-posts-list-item').then(posts => {
            callback(posts);
        });
    }
    getFirstFromListByTitle(title, callback) {
        let postItem = cy.contains('li', title).first();
        callback(postItem);
    }
    getPageListItems(callback) {
        cy.get('li.gh-posts-list-item')
            .each(($p, index, $list) => callback($p, index, $list));
    }
    getPageFromListByTitle(title, callback) {
        let postItem = cy.contains('li', title).first();
        callback(postItem);
    }
    goPageFromTitle(title){
        cy.contains('h3.gh-content-entry-title', title).first().click();
        cy.wait(300)
    }
    
}

export {Post, Page};