module.exports = function() {
   this.Given(/^there is a product with id "([^"]*)" with skus "([^"]*)" for retailer "([^"]*)"$/, function (productId, skuIdsString, retailerId) {
     const skuIds = skuIdsString.split(', ').map((skuId) =>  skuId.trim());

     const skus = skuIds.map((skuId) => ({ _id: skuId }));

     const product = {
       _id: productId,
       retailerId,
       skus,
     };

     server.call('product.create', retailerId, product);
   });

   this.When(/^I view the product with id "([^"]*)" for retailer "([^"]*)"$/, function (productId, retailerId) {
     try {

       const { product, wishlists } = server.call('product.view', retailerId, productId);
       this.product = product;
       this.wishlists = wishlists;

     } catch (error) {
       this.error = error;
     }
   });

    this.Then(/^I get the product with id "([^"]*)" with skus "([^"]*)" for retailer "([^"]*)"$/, function (productId, skuIdsString, retailerId) {
      const expectedSkuIds = skuIdsString.split(', ').map((skuId) =>  skuId.trim());

      expect(this.product).not.toBe(undefined);
      expect(this.product._id).toBe(productId);
      expect(this.product.retailerId).toBe(retailerId);

      expect(this.product.skus.length).toBe(expectedSkuIds.length);

      const actualSkuIds = this.product.skus.map((sku) => sku._id);

      expectedSkuIds.sort();
      actualSkuIds.sort();

      expectedSkuIds.forEach((skuId, index) => {
        expect(expectedSkuIds[index]).toBe(actualSkuIds[index]);
      });
    });
};