Feature: View product
  As a
  I want to
  So that

  Background:
    Given there is a retailer with name "Jigsaw Online" and id "jigsaw"

  Scenario: I am logged in
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    And I create a wishlist with name "My List 1" for retailer "jigsaw"
    And I create a wishlist with name "My List 2" for retailer "jigsaw"
    And there is a product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    When I view the product with id "XYZ" for retailer "jigsaw"
    Then I get the product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    And I get wishlists named "My List 1, My List 2" for retailer "jigsaw"

  Scenario: I am not logged in
    Given I am not logged in
    And there is a product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    When I view the product with id "XYZ" for retailer "jigsaw"
    Then I am notified about a "AUTH" error
