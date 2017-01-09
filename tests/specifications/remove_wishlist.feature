Feature: Remove a Wishlist
  As a
  I want to
  So that

  Scenario: I am logged in as the owner of the wishlist
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And I create a wishlist with name "My list"
    When I remove the wishlist
    Then I do not have the wishlist

  Scenario: I am not the owner of the wishlist
    Given a wishlist has been created with name "Not my list" and is owned by "john@dragondrop.uk"
    And I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    When I remove the wishlist
    Then the wishlist is not removed
    And I am notified about a "AUTH" error
