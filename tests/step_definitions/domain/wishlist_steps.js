import {
  findSkuInCollection,
  getSkuFromProduct,
  createUserAndLogin,
} from './support/step_utils';

module.exports = function () {
  this.Given(/^a wishlist has been created for retailer "([^"]*)" with name "([^"]*)" and is owned by "([^"]*)"$/, function (retailerId, name, email) {
    createUserAndLogin(email, "password", retailerId);

    this.wishlist = server.call('customer.createWishlist', name, retailerId);

    server.call('logout');
  });

  this.Given(/^a "([^"]*)" wishlist has been created for retailer "([^"]*)" with name "([^"]*)" and sku "([^"]*)" from product "([^"]*)" and is owned by "([^"]*)"$/, function (publicOrPrivate, retailerId, name, skuId, productId, email) {
    createUserAndLogin(email, "password", retailerId);

    const wishlist = server.call('customer.createWishlist', name, retailerId);

    server.call('wishlist.addSku', wishlist._id, getSkuFromProduct(skuId, productId, retailerId))

    server.call('wishlist.makePrivate', wishlist._id, publicOrPrivate === 'private');

    this.wishlist = server.call('wishlist.get', wishlist._id);

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

    try {
      server.call('wishlist.addSku', wishlistId, getSkuFromProduct(skuId, productId, retailerId));
    } catch (error) {
      this.error = error;
    }
  });

  this.When(/^I add a sku with id "([^"]*)" from product "([^"]*)" to the new wishlist "([^"]*)" for retailer "([^"]*)"$/, function (skuId, productId, wishlistName, retailerId) {
    try {
      this.wishlist = server.call('wishlist.createAndAddSku', retailerId, wishlistName, getSkuFromProduct(skuId, productId, retailerId));
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

  this.When(/^I set the wishlist privacy to "([^"]*)"$/, function (publicOrPrivate) {
    try {
      server.call('wishlist.makePrivate', this.wishlist._id, publicOrPrivate === 'private');
    } catch (error) {
      this.error = error;
    }
  });

  this.When(/^I remove sku "([^"]*)" from the wishlist$/, function (skuId) {
    try {
      server.call('wishlist.removeSku', this.wishlist._id, skuId);
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