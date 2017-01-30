Feature: Delete sku from wishlist
  As a
  I want to
  So that

  Background:
    Given there is a retailer with name "Jigsaw Online" and id "jigsaw"

  @focus
  Scenario: I am logged in as the owner of the wishlist
    Given I have an account with email "adam@dragondrop.uk" and password "password" for retailer "jigsaw"
    And I am logged in
    And I create a wishlist with name "My List 1" for retailer "jigsaw"
    And there is a product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    And I add a sku with id "456" from product "XYZ" to the wishlist for retailer "jigsaw"
    When I view the wishlist
    And I get the sku "456" with product id "XYZ"
    And I remove sku "456" from the wishlist
    Then the wishlist does not contain sku id "456"