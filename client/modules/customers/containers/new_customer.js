import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import NewCustomer from '../components/new_customer.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  createCustomer: actions.customer.createCustomer,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewCustomer);
