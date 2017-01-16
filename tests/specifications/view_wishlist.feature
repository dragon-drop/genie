Feature: View wishlist
  As a
  I want to
  So that

  Scenario: I am logged in
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And I create a wishlist with name "My List 1"
    And there is a product with id "XYZ" with skus "123, 456"
    And there is a product with id "ABC" with skus "789"
    When I add a sku with id "456" from product "XYZ" to the wishlist
    When I add a sku with id "789" from product "ABC" to the wishlist
    When I view the wishlist
    Then I get the sku "456" with product id "XYZ"
    And I get the sku "789" with product id "ABC"