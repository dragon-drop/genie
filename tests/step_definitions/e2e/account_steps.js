module.exports = function () {
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
    const userId = server.call('users.create', {
      email,
      password
    });
    this.userId = userId;
  });

  this.Given(/^I am logged in$/, function () {
    const { email, password } = this;
    client.url('http://localhost:3000/');
    client.waitForExist('#loginForm', 2000);

    client
      .addValue('input[name="email"]', email)
      .addValue('input[name="password"]', password)
      .submitForm('#loginForm');
  });

  this.Then(/^I am notified about a "([^"]*)" error$/, function (error) {});
};