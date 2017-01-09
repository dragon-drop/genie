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

  this.Given(/^I am logged in$/, function () {
    const {email, password} = this;

    server.call('login', { user: { email }, password });
  });

  this.Then(/^I am notified I am not authenticated$/, function () {
    expect(this.error.error).toBe('AUTH');
  });
};
