Feature: Add sku to wishlist
  As a
  I want to
  So that

  Scenario: I am logged in as the owner of the wishlist
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And I create a wishlist with name "My list"
    And there is a product with id "XYZ" with skus "123, 456"
    When I add a sku with id "456" from product "XYZ" to the wishlist
    Then the wishlist contains a sku with id "456" and product id "XYZ"

  Scenario: I am not the owner of the wishlist
    Given a wishlist has been created with name "Not my list" and is owned by "john@dragondrop.uk"
    And I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And there is a product with id "XYZ" with skus "123, 456"
    When I add a sku with id "456" from product "XYZ" to the wishlist
    Then the wishlist does not contain sku id "456"
    And I am notified about a "AUTH" error

  Scenario: I try and add to wishlist without a sku
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And I create a wishlist with name "My list"
    When I add to the wishlist without a sku
    And I am notified about a "400" error

  Scenario: I try and add to an invalid wishlist
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And there is a product with id "XYZ" with skus "123, 456"
    When I add a sku with id "456" from product "XYZ" to the wishlist
    And I am notified about a "400" error
