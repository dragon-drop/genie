import {Meteor} from 'meteor/meteor';
import {ServiceConfiguration} from 'meteor/service-configuration';
export default function () {
  if (Meteor.settings.services) {
    const {facebook} = Meteor.settings.services;
    if (facebook) {
      ServiceConfiguration.configurations.upsert(
        { service: 'facebook' },
        {
          $set: facebook
        }
      );
    }
  }
}
