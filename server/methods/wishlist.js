import { Wishlists } from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'wishlist.create'({ name, customerId, retailerId }) {
      check(name, String);
      check(customerId, String);
      check(retailerId, String);

      const id = Wishlists.insert({
        name,
        customerId,
        retailerId,
        'private': true,
        skus: [],
      });

      return Wishlists.findOne(id);
    },
    'wishlist.remove'(wishlistId) {
      check(wishlistId, String);

      const wishlist = Wishlists.findOne(wishlistId);

      if (!this.userId) {
        throw new Meteor.Error('AUTH', 'user is not logged in');
      }

      const customer = Meteor.call('customer.getCurrent', wishlist.retailerId);

      if (!customer || customer._id !== wishlist.customerId) {
        throw new Meteor.Error('AUTH', 'customerId is not the wishlist.customerId');
      }

      Wishlists.remove(wishlistId);
    },
    'wishlist.get'(wishlistId) {
      check(wishlistId, String);

      return Wishlists.findOne(wishlistId);
    },
    'wishlist.view'(wishlistId) {
      check(wishlistId, String);

      const wishlist = Wishlists.findOne(wishlistId);

      if (wishlist.private) {
        if (!this.userId) {
          throw new Meteor.Error('AUTH', 'user is not logged in');
        }

        const customer = Meteor.call('customer.getCurrent', wishlist.retailerId);

        if (!customer || customer._id !== wishlist.customerId) {
          throw new Meteor.Error('AUTH', 'customerId is not the wishlist.customerId');
        }
      }

      return wishlist;
    },
    'wishlist.createAndAddSku'(retailerId, name, sku) {
      let customer = Meteor.call('customer.getCurrent', retailerId);

      if (!customer) {
        Meteor.call('customer.create', this.userId, retailerId);
        customer = Meteor.call('customer.getCurrent', retailerId);
      }

      const customerId = customer._id;

      const wishlist = Meteor.call('wishlist.create', { name, customerId, retailerId });

      Meteor.call('wishlist.addSku', wishlist._id, sku);

      return wishlist
    },
    'wishlist.addSku'(wishlistId, sku) {
      check(wishlistId, String);
      check(sku, Object);

      const wishlist = Wishlists.findOne(wishlistId);

      const customer = Meteor.call('customer.getCurrent', wishlist.retailerId);
      const customerId = customer._id;

      if (customerId !== wishlist.customerId) {
        throw new Meteor.Error('AUTH', 'customerId is not the wishlist.customerId');
      }

      return Wishlists.update({
        _id: wishlistId,
      }, {
        $addToSet: {
          skus: sku
        }
      });
    },
    'wishlist.removeSku'(wishlistId, skuId) {
      check(wishlistId, String);
      check(skuId, String);

      const wishlist = Wishlists.findOne(wishlistId);

      const customer = Meteor.call('customer.getCurrent', wishlist.retailerId);

      if (!customer || customer._id !== wishlist.customerId) {
        throw new Meteor.Error('AUTH', 'customerId is not the wishlist.customerId');
      }

      return Wishlists.update({
        _id: wishlistId,
      }, {
        $pull: {
          skus: { _id: skuId}
        }
      });
    },
    'wishlist.makePrivate'(wishlistId, isPrivate) {
      check(wishlistId, String);
      check(isPrivate, Boolean);

      const wishlist = Wishlists.findOne(wishlistId);

      const customer = Meteor.call('customer.getCurrent', wishlist.retailerId);

      if (!customer || customer._id !== wishlist.customerId) {
        throw new Meteor.Error('AUTH', 'customerId is not the wishlist.customerId');
      }

      return Wishlists.update({
        _id: wishlistId,
      }, {
        $set: {
          private: isPrivate
        }
      });
    }
  });
}
