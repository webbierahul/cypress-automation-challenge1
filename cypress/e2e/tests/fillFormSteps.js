import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import practiceFormPage from '../pages/PracticeFormPage';

Given('I am on the practice form page', () => {
  practiceFormPage.visit();
});

When('I fill the form with the following details:', (datatable) => {
  const data = datatable.rowsHash();

  practiceFormPage.fillPersonalDetails(data.firstName, data.lastName, data.email, data.mobile);

  if (data.gender) {
    practiceFormPage.selectGender(data.gender);
  }

  if (data.subjects) {
    practiceFormPage.selectSubjects(data.subjects);
  }

  if (data.hobbies) {
    practiceFormPage.selectHobbies(data.hobbies);
  }

  if (data.address || data.state || data.city) {
    practiceFormPage.fillAddress(data.address, data.state, data.city);
  }

  // Store data for later validation
  cy.wrap(data).as('formData');
});

When('I fill the form with valid user details', () => {
  cy.fixture('userDetails').then((users) => {
    const user = users[0]; // Use first user from fixture

    practiceFormPage.fillPersonalDetails(user.firstName, user.lastName, user.email, user.mobile);

    practiceFormPage.selectGender(user.gender === 'male' ? 'Male' : 'Female');

    // Store data for later validation
    cy.wrap({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      gender: user.gender === 'male' ? 'Male' : 'Female',
    }).as('formData');
  });
});

When('I set the Date of Birth to {string} {string} {string}', (day, month, year) => {
  practiceFormPage.setDateOfBirth(day, month, year);

  // Store DOB for validation
  cy.get('@formData').then((data) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIndex = monthNames.indexOf(month);
    const formattedDate = `${day} ${month},${year}`;

    cy.wrap({
      ...data,
      dateOfBirth: formattedDate,
    }).as('formData');
  });
});

When('I upload the picture {string}', (fileName) => {
  practiceFormPage.uploadFile(fileName);

  // Store picture name for validation
  cy.get('@formData').then((data) => {
    cy.wrap({
      ...data,
      picture: fileName,
    }).as('formData');
  });
});

When('I submit the form', () => {
  practiceFormPage.submit();
});

When('I fill the form with an invalid email', () => {
  practiceFormPage.fillPersonalDetails('Test', 'User', 'invalid-email@abc', '1234567890');
  practiceFormPage.selectGender('Male');
});

Then('the submission modal should be displayed', () => {
  practiceFormPage.verifyModalDisplayed();
  practiceFormPage.verifyModalTitle('Thanks for submitting the form');
});

Then('the submitted details should be correct', () => {
  cy.get('@formData').then((data) => {
    practiceFormPage.verifySubmittedData(data);
  });
});

Then('the submitted details should match the entered data', () => {
  cy.get('@formData').then((data) => {
    practiceFormPage.verifySubmittedData(data);
  });
});

Then('validation errors should be displayed', () => {
  // The form should not show the success modal
  practiceFormPage.elements.modalTitle().should('not.exist');

  // Use should() with a callback for retry-ability
  // This will automatically retry until the assertion passes or times out
  practiceFormPage.elements.firstName().should(($el) => {
    const borderColor = $el.css('border-color');
    // Red border indicates validation error
    // The form applies validation styling asynchronously, so we need retry-ability
    expect(borderColor).to.match(/rgb\(220, 53, 69\)|rgb\(255, 0, 0\)|red/);
  });
});

Then('an email validation error should be shown', () => {
  // The form should not show the success modal
  practiceFormPage.elements.modalTitle().should('not.exist');

  // Email field should be invalid
  practiceFormPage.verifyEmailValidation();
});
