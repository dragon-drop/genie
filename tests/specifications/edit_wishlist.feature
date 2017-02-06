Feature: Edit wishlist
  As a
  I want to
  So that

  Background:
    Given there is a retailer with name "Jigsaw Online" and id "jigsaw"

  Scenario: I am logged in and own the wishlist
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    And I create a wishlist with name "My List 1" for retailer "jigsaw"
    When I rename the wishlist to "Actually it's called My List 2"
    Then I have a wishlist on my "jigsaw" account with name "Actually it's called My List 2"

  Scenario: I own the wishlist, but am not logged in
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    And I create a wishlist with name "My List 1" for retailer "jigsaw"
    And I am not logged in
    When I rename the wishlist to "Actually it's called My List 2"
    Then I am notified about a "AUTH" error

  Scenario: I am not the owner of the wishlist, but am logged in
    Given a wishlist has been created for retailer "jigsaw" with name "Not my list" and is owned by "john@dragondrop.uk"
    And I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    When I rename the wishlist to "Actually it's called My List 2"
    Then I am notified about a "AUTH" error

  @focus
  Scenario: I am not the owner of the wishlist, and not logged in
    Given a wishlist has been created for retailer "jigsaw" with name "Not my list" and is owned by "john@dragondrop.uk"
    When I rename the wishlist to "Actually it's called My List 2"
    Then I am notified about a "AUTH" error
