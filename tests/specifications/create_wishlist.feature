Feature: Create a Wishlist
  As a
  I want to
  So that

  Background:
    Given there is a retailer with name "Jigsaw Online" and id "jigsaw"

  Scenario: I am logged in
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    When I am logged in
    And I create a wishlist with name "My list" for retailer "jigsaw"
    Then I have a wishlist on my "jigsaw" account with name "My list"

  Scenario: I am logged in for different retailer
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    When I am logged in
    And I create a wishlist with name "My list" for retailer "another"
    Then I am notified about a "AUTH" error

  Scenario: I am not logged in
    Given I am not logged in
    When I create a wishlist with name "My list" for retailer "jigsaw"
    Then I am notified about a "AUTH" error
