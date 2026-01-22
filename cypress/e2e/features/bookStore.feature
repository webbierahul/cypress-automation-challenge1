Feature: Book Store Application

  Background:
    Given I am on the book store login page

  @positive @bookstore @login
  Scenario: Successful login to book store
    When I login with valid credentials
      | username | testuser123    |
      | password | Test@12345     |
    Then I should be logged in successfully
    And I should see my username in the profile

  @positive @bookstore @search
  Scenario: Search for books in the store
    When I login with valid credentials
      | username | testuser123    |
      | password | Test@12345     |
    And I navigate to the book store
    And I search for "JavaScript"
    Then I should see books related to "JavaScript"

  @positive @bookstore @collection
  Scenario: Add a book to collection
    When I login with valid credentials
      | username | testuser123    |
      | password | Test@12345     |
    And I navigate to the book store
    And I select the first book
    And I add the book to my collection
    Then the book should be added successfully
    When I navigate to my profile
    Then I should see the book in my collection

  @positive @bookstore @collection
  Scenario: Remove a book from collection
    When I login with valid credentials
      | username | testuser123    |
      | password | Test@12345     |
    And I navigate to my profile
    And I have at least one book in my collection
    When I delete the first book from my collection
    And I confirm the deletion
    Then the book should be removed from my collection

  @negative @bookstore @login
  Scenario: Login with invalid credentials
    When I login with invalid credentials
      | username | invaliduser    |
      | password | wrongpassword  |
    Then I should see an error message "Invalid username or password!"

  @negative @bookstore @login
  Scenario: Login with empty credentials
    When I click the login button without entering credentials
    Then validation errors should be displayed for login form
