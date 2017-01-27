import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Auth from '../components/auth.jsx';
export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState, FlowRouter} = context();
  const retailerId = FlowRouter.getParam('retailerId');

  const userId = Meteor.userId();
  console.log({userId});

  if (Meteor.subscribe('customer', retailerId, userId).ready()) {
    const currentCustomer = Collections.Customers.findOne({ retailerId, userId });
    console.log({ retailerId, userId, currentCustomer });
    if (!currentCustomer) {
      Meteor.logout();
    }

    onData(null, { currentCustomer });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Auth);
