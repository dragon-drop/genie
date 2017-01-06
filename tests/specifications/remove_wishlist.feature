Feature: Remove a Wishlist
  As a
  I want to
  So that

  @focus
  Scenario: I am logged in as the owner of the wishlist
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And I create a wishlist with name "My list"
    When I remove the wishlist
    Then I do not have the wishlist
