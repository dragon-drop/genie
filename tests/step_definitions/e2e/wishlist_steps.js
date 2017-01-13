module.exports = function () {
  this.When(/^I create a wishlist with name "([^"]*)"$/, function (name) {
    // wait for the previous request to complete
    client.waitForExist('#loginForm', 5000, true);

    client.url('http://localhost:3000/wishlists/new');
    client.waitForExist('#newWishlistForm', 2000);
    client
      .addValue('input[name="name"]', name)
      .submitForm('#newWishlistForm');
  });

  this.Then(/^I have a wishlist on my account with name "([^"]*)"$/, function (name) {
    client.url('http://localhost:3000/wishlists');
    client.waitForExist('.wishlist__name', 2000);
    expect(client.getText('.wishlist__name')).toEqual(name);
  });
};