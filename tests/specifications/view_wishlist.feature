Feature: View wishlist
  As a
  I want to
  So that

  Background:
    Given there is a retailer with name "Jigsaw Online" and id "jigsaw"

  Scenario: I am logged in
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    And I create a wishlist with name "My List 1" for retailer "jigsaw"
    And there is a product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    And there is a product with id "ABC" with skus "789" for retailer "jigsaw"
    When I add a sku with id "456" from product "XYZ" to the wishlist for retailer "jigsaw"
    When I add a sku with id "789" from product "ABC" to the wishlist for retailer "jigsaw"
    When I view the wishlist
    Then I get the sku "456" with product id "XYZ"
    And I get the sku "789" with product id "ABC"