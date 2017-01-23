module.exports = function() {
  this.Given(/^I am not logged in$/, function () {
    // Write the automation code here
    server.call('logout');
  });

  this.Given(/^I have an account with email "([^"]*)" and password "([^"]*)" for retailer "([^"]*)"$/, function (email, password, retailerId) {
    this.email = email;
    this.password = password;

    const userId = server.call('users.create', { email, password });
    const customerId = server.call('customer.create', userId, retailerId);
  });

  this.Given(/^I am logged in$/, function () {
    const {email, password} = this;

    server.call('login', { user: { email }, password });
  });

  this.Then(/^I am notified about a "([^"]*)" error$/, function (error) {
    expect(this.error.error.toString()).toBe(error);
  });

  this.Then(/^I get a "([^"]*)"$/, function (something) {
    expect(this[something]).not.toBe(undefined);
  });

  this.Then(/^I get no "([^"]*)"$/, function (something) {
    if (typeof this[something] === 'undefined') {
      expect(this[something]).toBe(undefined);
    } else {
      expect(this[something].length).toBe(0);
    }
  });
};
