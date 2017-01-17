module.exports = function () {
  this.Given(/^there is a retailer with name "([^"]*)" and id "([^"]*)"$/, function (name, _id) {
    this.retailer = server.call('retailer.create', { _id, name });
  });
};
