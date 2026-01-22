# Cypress Automation Challenge

A comprehensive Cypress automation framework using BDD (Cucumber), featuring automated testing for DemoQA's Practice Form and Book Store applications, with environment configuration, code quality tools, reporting, and CI/CD integration.

## 🚀 Features

- ✅ **BDD Framework** - Cucumber integration with Gherkin syntax
- ✅ **Page Object Model** - Maintainable and reusable page objects
- ✅ **Data-Driven Testing** - Scenario Outlines with multiple test data
- ✅ **Environment Configuration** - Support for dev, staging, and prod
- ✅ **Code Quality** - ESLint and Prettier integration
- ✅ **HTML Reporting** - Multiple Cucumber HTML reports
- ✅ **CI/CD Ready** - GitHub Actions with parallel execution
- ✅ **Multi-Browser Support** - Chrome, Firefox, and Edge

## 📋 Prerequisites

- Node.js >= 22.0.0
- IDE with Cucumber plugin installed(optional)


## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/webbierahul/cypress-automation-challenge.git
cd cypress-automation-challenge

# Install dependencies
npm install
```

## 🎯 Running Tests

### Interactive Mode (Cypress UI)

```bash
npm run cy:open
```

### Headless Mode

```bash
# Run all tests
npm run cy:run

# Run with headed browser
npm run cy:run:headed

# Run with specific environment
npm run cy:run:dev
npm run cy:run:staging
npm run cy:run:prod
```

### With Reporting

```bash
# Run tests and generate HTML report
npm run test:report
```

## 🧪 Test Scenarios

### Practice Form Tests

- ✅ Submit form with valid mandatory details
- ✅ Submit form with multiple user details (data-driven)
- ✅ Submit form with all fields filled
- ❌ Submit form without mandatory fields (negative)
- ❌ Submit form with invalid email (negative)

### Book Store Tests

- ✅ Login with valid credentials
- ✅ Search for books
- ✅ Add book to collection
- ✅ Remove book from collection
- ❌ Login with invalid credentials (negative)
- ❌ Login with empty credentials (negative)

## 📁 Project Structure

```
cypress-automation-challenge/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml      # GitHub Actions workflow
├── config/
│   └── environments.js            # Environment configurations
├── cypress/
│   ├── e2e/
│   │   ├── features/              # Gherkin feature files
│   │   │   ├── fillForm.feature
│   │   │   ├── form.feature
│   │   │   └── bookStore.feature
│   │   ├── pages/                 # Page Object Models
│   │   │   ├── PracticeFormPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── BookStorePage.js
│   │   │   └── ProfilePage.js
│   │   └── tests/                 # Step definitions
│   │       ├── fillFormSteps.js
│   │       └── bookStoreSteps.js
│   ├── fixtures/                  # Test data
│   │   ├── userDetails.json
│   │   ├── bookStoreUsers.json
│   │   └── sample.png
│   ├── reports/                   # Generated reports
│   ├── screenshots/               # Test screenshots
│   └── videos/                    # Test videos
├── docs/
│   └── CODE_REVIEW.md            # Code review findings
├── .eslintrc.json                # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── cypress.config.js             # Cypress configuration
├── cypress.env.json              # Environment variables
├── cucumber-html-reporter.js     # Report generator
└── package.json                  # Dependencies and scripts
```

## 🔧 Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## 📊 Reporting

After running tests, generate an HTML report:

```bash
npm run report:generate
```

The report will be available at: `cypress/reports/html/index.html`

## 🔄 CI/CD

The project includes a GitHub Actions workflow that:

- Runs on push/PR to main and develop branches
- Executes linting and formatting checks
- Runs tests in parallel across 3 containers
- Supports multiple browsers (Chrome, Firefox, Edge)
- Generates and uploads test reports
- Uploads screenshots and videos on failure

### Parallel Execution

The workflow uses a matrix strategy to run tests in parallel:

- 3 browsers × 3 containers = 9 parallel jobs
- Significantly reduces total execution time

## 🌍 Environment Configuration

Configure different environments in `config/environments.js`:

```javascript
{
  dev: { baseUrl: 'https://demoqa.com', timeout: 10000 },
  staging: { baseUrl: 'https://demoqa.com', timeout: 15000 },
  prod: { baseUrl: 'https://demoqa.com', timeout: 20000 }
}
```

## 📝 Code Review Findings

See [docs/CODE_REVIEW.md](docs/CODE_REVIEW.md) for detailed analysis of:

- ✅ Good practices identified
- ❌ Issues found and fixed
- 💡 Improvement recommendations

## 🎓 Key Improvements Made

1. **Fixed File Naming** - Renamed `formPage.js` to `PracticeFormPage.js`
2. **Improved Selectors** - Replaced fragile selectors with robust ones
3. **Converted Feature Files** - Transformed TODO into proper scenarios
4. **Added Data-Driven Testing** - Scenario Outlines for multiple users
5. **Environment Configuration** - Support for multiple environments
6. **Code Quality Tools** - ESLint and Prettier integration
7. **Comprehensive Reporting** - Multiple Cucumber HTML reports
8. **CI/CD Pipeline** - GitHub Actions with parallel execution
9. **Book Store Automation** - Complete test suite for book store app
10. **Better Assertions** - Comprehensive validation methods

## 🔮 Future Enhancements

- [ ] Add API testing for book store endpoints
- [ ] Implement visual regression testing
- [ ] Add performance testing with Lighthouse
- [ ] Integrate with test management tools (TestRail, Xray)
- [ ] Add accessibility testing (axe-core)
- [ ] Implement custom Cypress commands
- [ ] Add database validation
- [ ] Create reusable test utilities library
- [ ] Add cross-browser visual testing
- [ ] Implement test data management strategy

## 📄 License

ISC

## 👤 Author

Rahul Hovale

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

---

**Note**: This project was created as part of a QA Automation Engineer technical challenge to demonstrate proficiency in Cypress, BDD, test automation best practices, and CI/CD integration.
