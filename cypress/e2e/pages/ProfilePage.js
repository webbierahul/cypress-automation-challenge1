/// <reference types="cypress" />

class ProfilePage {
  elements = {
    userNameValue: () => cy.get('#userName-value'),
    booksTable: () => cy.get('.rt-table'),
    bookRows: () => cy.get('.rt-tr-group'),
    deleteBookBtn: () => cy.get('#delete-record-undefined'),
    deleteAllBooksBtn: () => cy.get('.text-right button').contains('Delete All Books'),
    confirmDeleteBtn: () => cy.get('#closeSmallModal-ok'),
    cancelDeleteBtn: () => cy.get('#closeSmallModal-cancel'),
    searchBox: () => cy.get('#searchBox'),
    noRowsMessage: () => cy.get('.rt-noData'),
    logoutBtn: () => cy.get('#submit').contains('Log out'),
    goToStoreBtn: () => cy.contains('Go To Book Store'),
  };

  visit() {
    const baseUrl = Cypress.env('baseUrl') || 'https://demoqa.com';
    cy.visit(`${baseUrl}/profile`);

    // Wait for profile page to load - username should be visible when logged in
    this.elements.userNameValue().should('be.visible', { timeout: 10000 });
  }

  verifyUsername(username) {
    this.elements
      .userNameValue()
      .invoke('text')
      .then((text) => {
        expect(text.trim().toLowerCase()).to.eq(username.toLowerCase());
      });
    return this;
  }

  verifyBookInCollection(bookTitle) {
    this.elements.bookRows().should('contain', bookTitle);
    return this;
  }

  verifyBooksCount(count) {
    if (count === 0) {
      this.elements.noRowsMessage().should('be.visible');
    } else {
      this.elements.bookRows().should('have.length.at.least', count);
    }
    return this;
  }

  hasBooks() {
    return this.elements.bookRows().then(($rows) => {
      return $rows.length > 0 && !$rows.first().text().includes('No rows found');
    });
  }

  deleteFirstBook() {
    this.elements.bookRows().first().find('[id^="delete-record"]').click({ force: true });
  }

  deleteAllBooks() {
    this.elements.deleteAllBooksBtn().click({ force: true });
  }

  confirmDeletion() {
    this.elements.confirmDeleteBtn().click();
    // Handle alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Book deleted');
    });
  }

  cancelDeletion() {
    this.elements.cancelDeleteBtn().click();
  }

  searchInCollection(searchTerm) {
    this.elements.searchBox().clear().type(searchTerm);
    cy.wait(500);
  }

  goToBookStore() {
    this.elements.goToStoreBtn().click();
  }

  logout() {
    this.elements.logoutBtn().click();
  }
}

export default new ProfilePage();
