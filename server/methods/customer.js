import { Customers, Wishlists } from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

function getCustomerId(retailerId) {
  const customer = Meteor.call('customer.getCurrent', retailerId);

  if (!customer) {
    throw new Meteor.Error('AUTH', 'customer is null');
  }

  return customer._id;
}

export default function () {
  Meteor.methods({
    'customer.create'(userId, retailerId) {
      return Customers.insert({ userId, retailerId });
    },
    'customer.getCurrent'(retailerId) {
      return Customers.findOne({ userId: this.userId, retailerId });
    },
    'customer.createWishlist'(name, retailerId) {
      check(name, String);
      check(retailerId, String);

      const customerId = getCustomerId(retailerId);

      return Meteor.call('wishlist.create', { name, customerId, retailerId });
    },
    'customer.getWishlist'(wishlistId, retailerId) {
      check(wishlistId, String);

      const customerId = getCustomerId(retailerId);

      return Wishlists.find({ customerId, _id: wishlistId, retailerId }).fetch();
    },
    'customer.getWishlistByName'(name, retailerId) {
      check(name, String);
      check(retailerId, String);

      const customerId = getCustomerId(retailerId);

      return Wishlists.find({ customerId, name, retailerId }).fetch();
    },
    'customer.getWishlists'(retailerId) {
      const customerId = getCustomerId(retailerId);

      return Wishlists.find({ customerId }).fetch();
    }
  });
}
