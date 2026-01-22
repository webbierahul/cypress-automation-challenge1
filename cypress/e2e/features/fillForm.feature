Feature: Practice Form submission

  Background:
    Given I am on the practice form page

  @positive @forms
  Scenario: Submit the form with valid mandatory details for Jane Smith
    When I fill the form with the following details:
      | firstName | Jane                       |
      | lastName  | Smith                      |
      | email     | automation-test@tester.com |
      | gender    | Female                     |
      | mobile    |                 1234567891 |
    And I submit the form
    Then the submission modal should be displayed
    And the submitted details should match the entered data

  @positive @forms @data-driven
  Scenario Outline: Submit the form with multiple user details
    When I fill the form with the following details:
      | firstName | <firstName> |
      | lastName  | <lastName>  |
      | email     | <email>     |
      | gender    | <gender>    |
      | mobile    | <mobile>    |
    And I submit the form
    Then the submission modal should be displayed
    And the submitted details should match the entered data

    Examples:
      | firstName | lastName | email                       | gender | mobile     |
      | Jane      | Smith    | automation-test@tester.com  | Female | 1234567891 |
      | John      | Chan     | automation-test2@tester.com | Male   | 9876543211 |

  @positive @forms @complete
  Scenario: Submit the form with all fields filled
    When I fill the form with the following details:
      | firstName | Jane            |
      | lastName  | Smith           |
      | email     | test@test.com   |
      | gender    | Female          |
      | mobile    |      1234567891 |
      | subjects  | Maths, English  |
      | hobbies   | Sports, Reading |
      | address   | 123 Test Street |
      | state     | NCR             |
      | city      | Delhi           |
    And I set the Date of Birth to "15" "May" "1990"
    And I upload the picture "sample.png"
    And I submit the form
    Then the submission modal should be displayed
    And the submitted details should match the entered data

  @negative @forms
  Scenario: Submit the form without mandatory fields
    When I submit the form
    Then validation errors should be displayed

  @negative @forms
  Scenario: Invalid email format
    When I fill the form with an invalid email
    And I submit the form
    Then an email validation error should be shown
