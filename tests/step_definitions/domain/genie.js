module.exports = function() {
  this.Given(/^I am not logged in$/, function () {
    // Write the automation code here
    server.call('logout');
  });

  this.Given(/^I have an account with email "([^"]*)" and password "([^"]*)"$/, function (email, password) {
    //SETUP
    const getUser = () => {
      return Meteor.user();
    };

    this.email = email;
    this.password = password;
    const userId = server.call('users.create', {email, password});
    this.userId = userId;

  });

  this.Given(/^a wishlist has been created with name "([^"]*)" and is owned by "([^"]*)"$/, function (name, email) {
    const password = "password";

    const userId = server.call('users.create', {email, password});
    server.call('login', { user: { email }, password });

    this.wishlist = server.call('customer.createWishlist', name);

    server.call('logout');
   });

  this.Given(/^I am logged in$/, function () {
    const {email, password} = this;
    server.call('login', { user: { email }, password });
  });

  this.When(/^I create a wishlist with name "([^"]*)"$/, function (name) {
    this.user = server.execute(() => Meteor.user());

    try {
      this.wishlist = server.call('customer.createWishlist', name);
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

  this.Then(/^I am notified I am not authenticated$/, function () {
    expect(this.error.error).toBe('AUTH');
  });

  this.Then(/^I do not have the wishlist$/, function () {
     const wishlist = server.call('customer.getWishlist', this.wishlist._id);

     expect(wishlist._id).toBe(undefined);
   });

   this.Then(/^the wishlist is not removed$/, function () {
     const wishlist = server.call('wishlist.get', this.wishlist._id);

     expect(wishlist._id).not.toBe(undefined);
   });
};
