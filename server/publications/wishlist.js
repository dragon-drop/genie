import {Wishlists} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('wishlist', function (wishlistId) {
    return Wishlists.find(wishlistId);
  });
}
