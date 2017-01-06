// import {Customer} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'customer.createWishlist'(wishlistName) {
      const customerId = this.userId;
      if (!customerId) {
        throw new Meteor.Error('AUTH', 'this.userId is null');
      }

      return Meteor.call('wishlist.create', { name: wishlistName, customerId });
    }
  });
}
