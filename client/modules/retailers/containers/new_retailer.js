import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import NewRetailer from '../components/new_retailer.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  createRetailer: actions.retailer.createRetailer,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewRetailer);
