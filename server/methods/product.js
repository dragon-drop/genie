import { Products, Wishlists, Skus } from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'product.create'(retailerId, product) {
      check(product, Object);

      const product_url = Meteor.call('product.getUrl', retailerId, product);

      product.url = product_url;

      product.skus.forEach((sku) => {
        Skus.insert(Object.assign(sku, {
          productId: product._id,
          name: product.name,
          product_url,
        }));
      });

      Products.insert(product);

      return Meteor.call('product.get', retailerId, product._id);
    },
    'product.getUrl'(retailerId, product) {
      let { product_url } = Meteor.call('retailer.get', retailerId);

      // e.g.
      // /product/:name/:_id
      const params = product_url.match(/\:(\w+)/g);
      // [':name', ':_id']

      params.forEach((param) => {
        let value = product[param.substring(1)];
        value = value.replace(/ /g, '-');

        if (param === ':name') value = value.toLowerCase();

        product_url = product_url.replace(param, value);
      });

      return product_url;
    },
    'product.get'(retailerId, productId) {
      check(productId, String);

      const product = Products.findOne({ _id: productId, retailerId });

      return product;
    },
    'product.view'(retailerId, productId) {
      check(productId, String);

      let error;

      const product = Meteor.call('product.get', retailerId, productId);
      const wishlists = Meteor.call('customer.getWishlists', retailerId);
      const user = Meteor.user() || undefined;
      const customer = Meteor.call('customer.getCurrent', retailerId);

      if (!this.userId) {
        error = new Meteor.Error('AUTH', 'this.userId is null');
      }

      return {
        product,
        wishlists,
        user,
        customer,
        error,
      };
    }
  });
}
