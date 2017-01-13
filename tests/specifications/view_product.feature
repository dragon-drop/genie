Feature: View product
  As a
  I want to
  So that

  Scenario: I am logged in
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit"
    And I am logged in
    And I create a wishlist with name "My List 1"
    And I create a wishlist with name "My List 2"
    And there is a product with id "XYZ" with skus "123, 456"
    When I view the product with id "XYZ"
    Then I get the product with id "XYZ" with skus "123, 456"
    And I get wishlists named "My List 1, My List 2"

  Scenario: I am not logged in
    Given I am not logged in
    And there is a product with id "XYZ" with skus "123, 456"
    When I view the product with id "XYZ"
    Then I am notified about a "AUTH" error
