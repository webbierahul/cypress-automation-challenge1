Feature: Practice Form submission(with Fixtures)

  Background:
    Given I am on the practice form page

  @positive @forms
  Scenario: Submit the form with valid mandatory details
    When I fill the form with valid user details
    And I submit the form
    Then the submission modal should be displayed
    And the submitted details should be correct
