import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import MainLayout from '../components/main_layout.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  onData(null, { });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MainLayout);
