/// <reference types="cypress" />

class PracticeFormPage {
  // Selectors
  elements = {
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    genderRadio: (gender) => cy.get(`input[name="gender"][value="${gender}"]`),
    genderLabel: (gender) =>
      cy.get(
        `label[for="gender-radio-${gender === 'Male' ? '1' : gender === 'Female' ? '2' : '3'}"]`
      ),
    mobile: () => cy.get('#userNumber'),
    dateOfBirthInput: () => cy.get('#dateOfBirthInput'),
    monthSelect: () => cy.get('.react-datepicker__month-select'),
    yearSelect: () => cy.get('.react-datepicker__year-select'),
    daySelect: (day) => {
      const dayNum = parseInt(day, 10);
      const paddedDay = dayNum < 10 ? `00${dayNum}` : `0${dayNum}`;
      return cy
        .get(`.react-datepicker__day--${paddedDay}`)
        .not('.react-datepicker__day--outside-month');
    },
    subjectsInput: () => cy.get('#subjectsInput'),
    hobbiesCheckbox: (hobby) => {
      const hobbyMap = {
        Sports: 'hobbies-checkbox-1',
        Reading: 'hobbies-checkbox-2',
        Music: 'hobbies-checkbox-3',
      };
      return cy.get(`#${hobbyMap[hobby]}`);
    },
    hobbiesLabel: (hobby) => cy.get(`label[for="${this.getHobbyId(hobby)}"]`),
    uploadPicture: () => cy.get('#uploadPicture'),
    address: () => cy.get('#currentAddress'),
    stateDropdown: () => cy.get('#state'),
    stateInput: () => cy.get('#react-select-3-input'),
    cityDropdown: () => cy.get('#city'),
    cityInput: () => cy.get('#react-select-4-input'),
    submitBtn: () => cy.get('#submit'),
    modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
    modalTable: () => cy.get('.table-responsive'),
    modalTableRows: () => cy.get('.table-responsive tbody tr'),
    closeModalBtn: () => cy.get('#closeLargeModal'),
    validationError: () => cy.get('.was-validated'),
    emailValidationError: () => cy.get('#userEmail:invalid'),
  };

  getHobbyId(hobby) {
    const hobbyMap = {
      Sports: 'hobbies-checkbox-1',
      Reading: 'hobbies-checkbox-2',
      Music: 'hobbies-checkbox-3',
    };
    return hobbyMap[hobby];
  }

  visit() {
    const baseUrl = Cypress.env('baseUrl') || 'https://demoqa.com';
    cy.visit(`${baseUrl}/automation-practice-form`);

    // Handle potential ads and footer issues
    cy.window().then((win) => {
      win.document.body.style.zoom = '0.8';
    });

    // Wait for form to be ready
    this.elements.firstName().should('be.visible');
  }

  fillPersonalDetails(firstName, lastName, email, mobile) {
    if (firstName) this.elements.firstName().clear().type(firstName);
    if (lastName) this.elements.lastName().clear().type(lastName);
    if (email) this.elements.email().clear().type(email);
    if (mobile) this.elements.mobile().clear().type(mobile);
  }

  selectGender(gender) {
    // Click the label instead of the hidden radio button
    this.elements.genderLabel(gender).click({ force: true });
  }

  setDateOfBirth(day, month, year) {
    this.elements.dateOfBirthInput().click();
    this.elements.monthSelect().select(month);
    this.elements.yearSelect().select(year);
    this.elements.daySelect(day).first().click();
  }

  selectSubject(subject) {
    this.elements.subjectsInput().type(`${subject}{enter}`);
  }

  selectSubjects(subjectsString) {
    const subjects = subjectsString.split(', ');
    subjects.forEach((subject) => {
      this.selectSubject(subject);
    });
  }

  selectHobbies(hobbiesString) {
    const hobbies = hobbiesString.split(', ');
    hobbies.forEach((hobby) => {
      this.elements.hobbiesLabel(hobby).click({ force: true });
    });
  }

  uploadFile(fileName) {
    this.elements.uploadPicture().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  }

  fillAddress(address, state, city) {
    if (address) {
      this.elements.address().scrollIntoView().clear().type(address);
    }

    if (state) {
      this.elements.stateDropdown().scrollIntoView().click();
      this.elements.stateInput().type(`${state}{enter}`, { force: true });
    }

    if (city) {
      this.elements.cityDropdown().scrollIntoView().click();
      this.elements.cityInput().type(`${city}{enter}`, { force: true });
    }
  }

  submit() {
    this.elements.submitBtn().scrollIntoView().click({ force: true });
  }

  // Validation methods
  verifyModalDisplayed() {
    this.elements.modalTitle().should('be.visible');
    return this;
  }

  verifyModalTitle(expectedTitle) {
    this.elements.modalTitle().should('have.text', expectedTitle);
    return this;
  }

  verifySubmittedData(data) {
    const fullName = `${data.firstName} ${data.lastName}`;

    this.elements.modalTableRows().then(($rows) => {
      const tableData = {};
      $rows.each((index, row) => {
        const cells = Cypress.$(row).find('td');
        const label = cells.eq(0).text();
        const value = cells.eq(1).text();
        tableData[label] = value;
      });

      // Verify each field
      if (data.firstName && data.lastName) {
        expect(tableData['Student Name']).to.equal(fullName);
      }
      if (data.email) {
        expect(tableData['Student Email']).to.equal(data.email);
      }
      if (data.gender) {
        expect(tableData['Gender']).to.equal(data.gender);
      }
      if (data.mobile) {
        expect(tableData['Mobile']).to.equal(data.mobile);
      }
      if (data.dateOfBirth) {
        expect(tableData['Date of Birth']).to.contain(data.dateOfBirth);
      }
      if (data.subjects) {
        expect(tableData['Subjects']).to.equal(data.subjects);
      }
      if (data.hobbies) {
        expect(tableData['Hobbies']).to.equal(data.hobbies);
      }
      if (data.picture) {
        expect(tableData['Picture']).to.equal(data.picture);
      }
      if (data.address) {
        expect(tableData['Address']).to.equal(data.address);
      }
      if (data.state && data.city) {
        expect(tableData['State and City']).to.equal(`${data.state} ${data.city}`);
      }
    });

    return this;
  }

  closeModal() {
    this.elements.closeModalBtn().click();
    return this;
  }

  verifyValidationErrors() {
    // Check if required fields show validation
    this.elements.firstName().should(($el) => {
      const hasInvalidClass = $el.hasClass('is-invalid');
      const borderColor = $el.css('border-color');
      const hasRedBorder = borderColor.includes('220, 53, 69') || borderColor.includes('255, 0, 0');

      expect(hasInvalidClass || hasRedBorder).to.be.true;
    });
    return this;
  }

  verifyEmailValidation() {
    this.elements.email().then(($el) => {
      const validityState = $el[0].validity;
      expect(validityState.valid).to.be.false;
    });
    return this;
  }
}

export default new PracticeFormPage();
