import {Customers} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match } from 'meteor/check';

export default function () {
  Meteor.publish('customer', function (retailerId, userId) {
    check(retailerId, String);
    check(userId, Match.Maybe(String));

    return Customers.find({ retailerId, userId });
  });
}
