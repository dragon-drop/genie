import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import RetailerIndex from '../components/retailer_index.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  Meteor.call('retailer.getAll', (error, retailers) => {
    if (error) {
      return console.error(error);
    }

    onData(null, { retailers });
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RetailerIndex);
