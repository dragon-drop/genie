export function findSkuInCollection(testSku, collection) {
  let skuFound = false;

  const skuId = testSku._id;
  const productId = testSku.productId;

  collection.forEach((sku) => {
    if (sku._id === skuId) {
      skuFound = true;

      expect(sku.productId).toBe(productId);
    }
  });

  expect(skuFound).toBe(true);
}

export function getSkuFromProduct(skuId, productId, retailerId) {
  const product = server.call('product.get', retailerId, productId);

  let sku;

  product.skus.forEach((productSku) => {
    if (productSku._id === skuId) {
      sku = productSku;
    }
  });

  return sku;
}

export function createUserAndLogin(email, password, retailerId) {
  const userId = server.call('users.create', { email, password });

  server.call('customer.create', userId, retailerId);

  server.call('login', { user: { email }, password });

  return userId;
}