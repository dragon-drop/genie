module.exports = function() {
  this.Given(/^a wishlist has been created with name "([^"]*)" and is owned by "([^"]*)"$/, function (name, email) {
    const password = "password";

    const userId = server.call('users.create', {email, password});

    server.call('login', { user: { email }, password });

    this.wishlist = server.call('customer.createWishlist', name);

    server.call('logout');
   });

   this.When(/^I create a wishlist with name "([^"]*)"$/, function (name) {
     this.user = server.execute(() => Meteor.user());

     try {
       this.wishlist = server.call('customer.createWishlist', name);
     } catch (error) {
       this.error = error;
     }
   });

   this.When(/^I add a sku with id "([^"]*)" to the wishlist$/, function (skuId) {
     try {
       server.call('wishlist.addSku', this.wishlist._id, skuId);
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

   this.Then(/^I have a wishlist on my account with name "([^"]*)"$/, function (name) {
     expect(this.wishlist.customerId).toBe(this.userId);
     expect(this.wishlist.name).toBe(name);
   });

   this.Then(/^I do not have the wishlist$/, function () {
      const wishlist = server.call('customer.getWishlist', this.wishlist._id);

      expect(wishlist._id).toBe(undefined);
    });

    this.Then(/^the wishlist is not removed$/, function () {
      const wishlist = server.call('wishlist.get', this.wishlist._id);

      expect(wishlist._id).not.toBe(undefined);
    });

    this.Then(/^the wishlist contains sku id "([^"]*)"$/, function (skuId) {
      const wishlist = server.call('wishlist.get', this.wishlist._id);

      expect(wishlist.skus.indexOf(skuId)).not.toBe(-1);
    });

    this.Then(/^the wishlist does not contain sku id "([^"]*)"$/, function (skuId) {
      const wishlist = server.call('wishlist.get', this.wishlist._id);

      expect(wishlist.skus.indexOf(skuId)).toBe(-1);
    });
};