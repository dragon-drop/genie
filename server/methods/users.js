import { Users } from '/lib/collections';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

export default function () {
  Meteor.methods({
    'users.create'(options) {
      check(options, Object);
      return Accounts.createUser(options);
    }
  });
}
