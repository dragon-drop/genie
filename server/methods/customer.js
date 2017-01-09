import {Wishlists} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'customer.createWishlist'(wishlistName) {
      check(wishlistName, String);

      if (!this.userId) {
        throw new Meteor.Error('AUTH', 'this.userId is null');
      }

      return Meteor.call('wishlist.create', { name: wishlistName, customerId: this.userId });
    },
    'customer.getWishlist'(wishlistId) {
      check(wishlistId, String);

      return Wishlists.find({ customerId: this.userId, _id: wishlistId }).fetch();
    }
  });
}
