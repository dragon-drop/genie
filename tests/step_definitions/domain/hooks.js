module.exports = function () {
  // runs before each and every single scenario
  this.Before(function () {
    server.execute(() => Accounts.removeDefaultRateLimit());

    fixtures.common.reset();
  });
};
