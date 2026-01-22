import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../pages/LoginPage';
import bookStorePage from '../pages/BookStorePage';
import profilePage from '../pages/ProfilePage';

Given('I am on the book store login page', () => {
  loginPage.visit();
});

When('I login with valid credentials', (datatable) => {
  const credentials = datatable.rowsHash();
  cy.fixture('bookStoreUsers').then((users) => {
    const user = users.validUser;
    // Use loginAndWait for successful login - waits for session to be established
    loginPage.loginAndWait(user.username, user.password);

    cy.wrap(user.username).as('currentUsername');
  });
});

When('I login with invalid credentials', (datatable) => {
  const credentials = datatable.rowsHash();
  loginPage.login(credentials.username, credentials.password);
});

When('I click the login button without entering credentials', () => {
  loginPage.clickLoginWithoutCredentials();
});

When('I navigate to the book store', () => {
  bookStorePage.visit();
});

When('I navigate to my profile', () => {
  profilePage.visit();
});

When('I search for {string}', (searchTerm) => {
  bookStorePage.searchBook(searchTerm);
  cy.wrap(searchTerm).as('searchTerm');
});

When('I select the first book', () => {
  bookStorePage.selectFirstBook();
});

When('I add the book to my collection', () => {
  // Stub the alert to prevent it from blocking
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('alertStub');
  });
  bookStorePage.addBookToCollection();
});

When('I have at least one book in my collection', () => {
  profilePage.hasBooks().then((hasBooks) => {
    if (!hasBooks) {
      // Add a book if collection is empty
      bookStorePage.visit();
      bookStorePage.selectFirstBook();
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alertStub');
      });
      bookStorePage.addBookToCollection();
      profilePage.visit();
    }
  });
});

When('I delete the first book from my collection', () => {
  // Stub the confirm dialog
  cy.window().then((win) => {
    cy.stub(win, 'confirm').returns(true);
  });
  profilePage.deleteFirstBook();
});

When('I confirm the deletion', () => {
  // Stub the alert
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('deleteAlert');
  });
  profilePage.confirmDeletion();
});

Then('I should be logged in successfully', () => {
  loginPage.verifyLoggedIn();
});

Then('I should see my username in the profile', () => {
  cy.get('@currentUsername').then((username) => {
    profilePage.visit();
    profilePage.verifyUsername(username);
  });
});

Then('I should see books related to {string}', (searchTerm) => {
  bookStorePage.verifyBooksDisplayed(searchTerm);
});

Then('the book should be added successfully', () => {
  cy.get('@alertStub').should('have.been.calledWith', 'Book added to your collection.');
});

Then('I should see the book in my collection', () => {
  profilePage.verifyBooksCount(1);
});

Then('the book should be removed from my collection', () => {
  // Verify the alert was called
  cy.get('@deleteAlert').should('have.been.called');
});

Then('I should see an error message {string}', (errorMessage) => {
  loginPage.verifyErrorMessage(errorMessage);
});

Then('validation errors should be displayed for login form', () => {
  loginPage.verifyValidationErrors();
});
