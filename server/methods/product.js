import { Products, Wishlists, Skus } from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'product.create'(retailerId, product) {
      check(product, Object);

      product.skus.forEach((sku) => {
        Skus.insert(Object.assign(sku, { productId: product._id }));
      });

      Products.insert(product);

      return Meteor.call('product.get', retailerId, product._id);
    },
    'product.get'(retailerId, productId) {
      check(productId, String);

      return Products.findOne({ _id: productId, retailerId });
    },
    'product.view'(retailerId, productId) {
      check(productId, String);

      if (!this.userId) {
        throw new Meteor.Error('AUTH', 'this.userId is null');
      }

      const product = Meteor.call('product.get', retailerId, productId);

      const wishlists = Meteor.call('customer.getWishlists', retailerId);

      return {
        product,
        wishlists,
      };
    }
  });
}
