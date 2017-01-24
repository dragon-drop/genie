function findSkuInCollection(testSku, collection) {
  let skuFound = false;

  const skuId = testSku._id;
  const productId = testSku.productId;

  collection.forEach((sku) => {
    if (sku._id === skuId) {
      skuFound = true;

      expect(sku.productId).toBe(productId);
    }
  });

  expect(skuFound).toBe(true);
}

module.exports = function () {
  this.Given(/^a wishlist has been created for retailer "([^"]*)" with name "([^"]*)" and is owned by "([^"]*)"$/, function (retailerId, name, email) {
    const password = "password";

    const userId = server.call('users.create', {
      email,
      password
    });

    server.call('customer.create', userId, retailerId);

    server.call('login', {
      user: {
        email
      },
      password
    });

    this.wishlist = server.call('customer.createWishlist', name, retailerId);

    server.call('logout');
  });

  this.When(/^I create a wishlist with name "([^"]*)" for retailer "([^"]*)"$/, function (name, retailerId) {
    this.user = server.execute(() => Meteor.user());

    try {
      this.wishlist = server.call('customer.createWishlist', name, retailerId);
    } catch (error) {
      this.error = error;
    }
  });

  this.When(/^I add a sku with id "([^"]*)" from product "([^"]*)" to the wishlist for retailer "([^"]*)"$/, function (skuId, productId, retailerId) {
    const wishlistId = typeof this.wishlist !== 'undefined' ? this.wishlist._id : undefined;

    const product = server.call('product.get', retailerId, productId);

    let sku;

    product.skus.forEach((productSku) => {
      if (productSku._id === skuId) {
        sku = productSku;
      }
    });

    try {
      server.call('wishlist.addSku', wishlistId, sku);
    } catch (error) {
      this.error = error;
    }
  });

  this.When(/^I add a sku with id "([^"]*)" from product "([^"]*)" to the new wishlist "([^"]*)" for retailer "([^"]*)"$/, function (skuId, productId, wishlistName, retailerId) {
    const product = server.call('product.get', retailerId, productId);

    let sku;

    product.skus.forEach((productSku) => {
      if (productSku._id === skuId) {
        sku = productSku;
      }
    });

    try {
      this.wishlist = server.call('wishlist.createAndAddSku', retailerId, wishlistName, sku);
    } catch (error) {
      this.error = error;
    }
  });

  this.When(/^I remove the wishlist$/, function () {
    try {
      server.call('wishlist.remove', this.wishlist._id);
    } catch (error) {
      this.error = error;
    }
  });

  this.When(/^I add to the wishlist without a sku$/, function () {
    try {
      server.call('wishlist.addSku', this.wishlist._id);
    } catch (error) {
      this.error = error;
    }
  });

  this.When(/^I view the wishlist$/, function () {
    try {
      this.viewWishlistResponse = server.call('wishlist.view', this.wishlist._id);
    } catch (error) {
      this.error = error;
    }
  });

  this.Then(/^I have a wishlist on my "([^"]*)" account with name "([^"]*)"$/, function (retailerId, name) {
    const customer = server.call('customer.getCurrent', retailerId);
    const customerId = customer._id;

    expect(this.wishlist.customerId).toBe(customerId);
    expect(this.wishlist.name).toBe(name);
    expect(this.wishlist.retailerId).toBe(retailerId);
  });

  this.Then(/^I do not have a wishlist on my "([^"]*)" account with name "([^"]*)"$/, function (retailerId, name) {
    const wishlist = server.call('customer.getWishlistByName', name, retailerId);

    expect(wishlist._id).toBe(undefined);
  });

  this.Then(/^I do not have the wishlist with name "([^"]*)" for retailer "([^"]*)"$/, function (name, retailerId) {
    const wishlist = server.call('customer.getWishlistByName', name, retailerId);

    expect(wishlist._id).toBe(undefined);
  });

  this.Then(/^the wishlist is not removed$/, function () {
    const wishlist = server.call('wishlist.get', this.wishlist._id);

    expect(wishlist._id).not.toBe(undefined);
  });

  this.Then(/^the wishlist does not contain sku id "([^"]*)"$/, function (skuId) {
    const wishlist = server.call('wishlist.get', this.wishlist._id);

    expect(wishlist.skus.indexOf(skuId)).toBe(-1);
  });

  this.Then(/^I get wishlists named "([^"]*)" for retailer "([^"]*)"$/, function (wishlistsString, retailerId) {
    const wishlistNames = wishlistsString.split(', ').map((wishlistName) => wishlistName.trim());

    wishlistNames.forEach((wishlistName, index) => {
      expect(this.wishlists[index].name).toBe(wishlistName);
      expect(this.wishlists[index].retailerId).toBe(retailerId);
    });
  });

  this.Then(/^the wishlist contains a sku with id "([^"]*)" and product id "([^"]*)"$/, function (skuId, productId) {
    const wishlist = server.call('wishlist.get', this.wishlist._id);

    findSkuInCollection({ _id: skuId, productId }, wishlist.skus);
  });

  this.Then(/^I get the sku "([^"]*)" with product id "([^"]*)"$/, function (skuId, productId) {
    findSkuInCollection({ _id: skuId, productId }, this.viewWishlistResponse.skus);
  });
};