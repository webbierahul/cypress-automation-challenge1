/// <reference types="cypress" />

class LoginPage {
  elements = {
    usernameInput: () => cy.get('#userName'),
    passwordInput: () => cy.get('#password'),
    loginBtn: () => cy.get('#login'),
    logoutBtn: () => cy.get('#submit').contains('Log out'),
    userNameLabel: () => cy.get('#userName-value'),
    errorMessage: () => cy.get('#name'),
    newUserBtn: () => cy.get('#newUser'),
  };

  visit() {
    const baseUrl = Cypress.env('baseUrl') || 'https://demoqa.com';
    cy.visit(`${baseUrl}/login`);
    this.elements.usernameInput().should('be.visible');
  }

  login(username, password) {
    this.elements.usernameInput().clear().type(username);
    this.elements.passwordInput().clear().type(password);
    this.elements.loginBtn().click();
  }

  loginAndWait(username, password) {
    this.login(username, password);
    // Wait for login to complete - logout button appears when logged in
    this.elements.logoutBtn().should('be.visible', { timeout: 10000 });
  }

  clickLoginWithoutCredentials() {
    this.elements.loginBtn().click();
  }

  logout() {
    this.elements.logoutBtn().click();
  }

  verifyLoggedIn() {
    this.elements.logoutBtn().should('be.visible');
    return this;
  }

  verifyUsername(username) {
    this.elements.userNameLabel().should('have.text', username);
    return this;
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage().should('contain', message);
    return this;
  }

  verifyValidationErrors() {
    // Check username field has validation error
    this.elements.usernameInput().should(($el) => {
      const hasInvalidClass = $el.hasClass('is-invalid');
      const borderColor = $el.css('border-color');
      const hasRedBorder = borderColor.includes('220, 53, 69') || borderColor.includes('255, 0, 0');
      
      expect(hasInvalidClass || hasRedBorder).to.be.true;
    });

    // Check password field has validation error
    this.elements.passwordInput().should(($el) => {
      const hasInvalidClass = $el.hasClass('is-invalid');
      const borderColor = $el.css('border-color');
      const hasRedBorder = borderColor.includes('220, 53, 69') || borderColor.includes('255, 0, 0');
      
      expect(hasInvalidClass || hasRedBorder).to.be.true;
    });

    return this;
  }
}

export default new LoginPage();
