Feature: Create a Wishlist
  As a
  I want to
  So that

  @e2e
  Scenario: I am logged in
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    When I create a wishlist with name "My list"
    Then I have a wishlist on my account with name "My list"

  Scenario: I am not logged in
    Given I am not logged in
    When I create a wishlist with name "My list"
    Then I am notified about a "AUTH" error
