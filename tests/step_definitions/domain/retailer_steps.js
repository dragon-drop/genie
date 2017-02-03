module.exports = function () {
  this.Given(/^there is a retailer with name "([^"]*)" and id "([^"]*)"$/, function (name, _id) {
    this.retailer = server.call('retailer.create', {
      _id,
      name,
      product_url: `http://www.${_id}.com/product/:_id`
    });
  });
};
