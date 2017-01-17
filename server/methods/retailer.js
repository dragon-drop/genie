import { Retailers } from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'retailer.create'(retailer) {
      check(retailer, Object);

      Retailers.insert(retailer);

      return Meteor.call('retailer.get', retailer._id);
    },
    'retailer.get'(retailerId) {
      check(retailerId, String);

      return Retailers.findOne(retailerId);
    },
    'retailer.getAll'() {
      return Retailers.find({}).fetch();
    }
  });
}
