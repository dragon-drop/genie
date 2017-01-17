Feature: Remove a Wishlist
  As a
  I want to
  So that

  Background:
    Given there is a retailer with name "Jigsaw Online" and id "jigsaw"

  Scenario: I am logged in as the owner of the wishlist
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    And I create a wishlist with name "My list" for retailer "jigsaw"
    When I remove the wishlist
    Then I do not have the wishlist with name "My list" for retailer "jigsaw"

  Scenario: I am not the owner of the wishlist
    Given a wishlist has been created for retailer "jigsaw" with name "Not my list" and is owned by "john@dragondrop.uk"
    And I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    When I remove the wishlist
    Then the wishlist is not removed
    And I am notified about a "AUTH" error
