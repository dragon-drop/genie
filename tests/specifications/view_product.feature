Feature: View product
  As a
  I want to
  So that

  Background:
    Given there is a retailer with name "Jigsaw Online" and id "jigsaw"
    And there is a retailer with name "Oasis" and id "oasis"

  Scenario: I have an account with Genie, am a customer of jigsaw, I am logged in
    # Then I have a user and a customer
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "jigsaw"
    And I am logged in
    And I create a wishlist with name "My List 1" for retailer "jigsaw"
    And I create a wishlist with name "My List 2" for retailer "jigsaw"
    And there is a product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    When I view the product with id "XYZ" for retailer "jigsaw"
    Then I get the product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    And I get a "user"
    And I get a "customer"
    And I get no "error"
    And I get wishlists named "My List 1, My List 2" for retailer "jigsaw"

  Scenario: I have an account with Genie, I am logged in, but I am not a customer of jigsaw
    # Then expect customer to be undefined
    # Then probably just allow them to create their first wishlist
      # where we then create a customer account for them and create that wishlist, and probably add the product to it
    Given I have an account with email "adam@dragondrop.uk" and password "pope-shit" for retailer "oasis"
    And I am logged in
    And there is a product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    When I view the product with id "XYZ" for retailer "jigsaw"
    Then I get the product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    And I get a "user"
    And I get no "customer"
    And I get no "error"
    And I get no "wishlists"

  Scenario: I am not logged in (and/or don't have a Genie account; both are solved the same way)
    # Then expect user to be undefined
    # Then I see the product and am asked to login
    Given I am not logged in
    And there is a product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    When I view the product with id "XYZ" for retailer "jigsaw"
    Then I get the product with id "XYZ" with skus "123, 456" for retailer "jigsaw"
    And I get no "user"
    And I get no "customer"
    And I am notified about a "AUTH" error
    And I get no "wishlists"
