import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ShowRetailer from '../components/show_retailer.jsx';

export const composer = ({context}, onData) => {
  const { Meteor, FlowRouter, Collections } = context();

  const retailerId = FlowRouter.getParam('retailerId');

  const customer = Meteor.call('customer.getCurrent', retailerId, (error, customer) => {
    // if a customer exists for this retailerId
    if (customer) {
      // redirect to /rid/wishlists
      return FlowRouter.go(`/${retailerId}/wishlists`);
    }

    // else show them the 'become a customer' form
    Meteor.call('retailer.get', retailerId, (error, retailer) => {
      if (error) {
        return console.error(error);
      }

      const userId = Meteor.userId();

      onData(null, { retailer, userId });
    });
  });
};

export const depsMapper = (context, actions) => ({
  createCustomer: actions.customer.createCustomer,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ShowRetailer);
