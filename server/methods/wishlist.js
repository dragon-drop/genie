import {Wishlists} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'wishlist.create'({name, customerId}) {
      check(name, String);
      check(customerId, String);

      const id = Wishlists.insert({
        name,
        customerId,
        skus: [],
      });

      return Wishlists.findOne(id);
    },
    'wishlist.remove'(wishlistId) {
      check(wishlistId, String);

      const wishlist = Wishlists.findOne(wishlistId);

      if (this.userId !== wishlist.customerId) {
        throw new Meteor.Error('AUTH', 'this.userId is not the wishlist.customerId');
      }

      Wishlists.remove(wishlistId);
    },
    'wishlist.get'(wishlistId) {
      check(wishlistId, String);

      return Wishlists.findOne(wishlistId);
    },
    'wishlist.addSku'(wishlistId, skuId) {
      check(wishlistId, String);
      check(skuId, String);

      const wishlist = Wishlists.findOne(wishlistId);

      if (this.userId !== wishlist.customerId) {
        throw new Meteor.Error('AUTH', 'this.userId is not the wishlist.customerId');
      }

      return Wishlists.update({
        _id: wishlistId,
      }, {
        $addToSet: {
          skus: skuId
        }
      });
    }
  });
}
