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
  });
}
