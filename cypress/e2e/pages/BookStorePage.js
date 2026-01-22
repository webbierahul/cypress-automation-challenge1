/// <reference types="cypress" />

class BookStorePage {
  elements = {
    searchBox: () => cy.get('#searchBox'),
    booksList: () => cy.get('.rt-tr-group'),
    bookTitle: () => cy.get('.mr-2 a'),
    bookItem: (title) => cy.contains('.rt-tr-group', title),
    loginLink: () => cy.get('#login'),
    addToCollectionBtn: () => cy.get('#addNewRecordButton'),
    backToStoreBtn: () => cy.contains('Back To Book Store'),
    noRowsMessage: () => cy.get('.rt-noData'),
  };

  visit() {
    const baseUrl = Cypress.env('baseUrl') || 'https://demoqa.com';
    cy.visit(`${baseUrl}/books`);
  }

  searchBook(searchTerm) {
    this.elements.searchBox().clear().type(searchTerm);
    cy.wait(500); // Wait for search to filter
  }

  verifyBooksDisplayed(searchTerm) {
    this.elements.bookTitle().should('be.visible');
    // Verify at least one book contains the search term
    this.elements.bookTitle().first().should('contain', searchTerm);
    return this;
  }

  selectFirstBook() {
    this.elements.bookTitle().first().click();
  }

  selectBookByTitle(title) {
    this.elements.bookItem(title).find('a').click();
  }

  addBookToCollection() {
    this.elements.addToCollectionBtn().scrollIntoView().click({ force: true });
  }

  verifyBookAdded() {
    // Check for success alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Book added to your collection');
    });
    return this;
  }

  backToStore() {
    this.elements.backToStoreBtn().click();
  }
}

export default new BookStorePage();
