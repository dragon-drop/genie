import { Products, Wishlists, Skus } from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'product.create'(product) {
      check(product, Object);

      product.skus.forEach((sku) => {
        Skus.insert(Object.assign(sku, { productId: product._id }));
      });

      Products.insert(product);

      return Meteor.call('product.get', product._id);
    },
    'product.get'(productId) {
      check(productId, String);

      return Products.findOne(productId);
    },
    'product.view'(productId) {
      check(productId, String);

      if (!this.userId) {
        throw new Meteor.Error('AUTH', 'this.userId is null');
      }

      const product = Meteor.call('product.get', productId);

      const wishlists = Meteor.call('customer.getWishlists');

      return {
        product,
        wishlists,
      };
    }
  });
}
