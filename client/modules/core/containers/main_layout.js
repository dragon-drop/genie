import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import MainLayout from '../components/main_layout.jsx';

let notificationTimeout;

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  const error = LocalState.get('ERROR');
  const success = LocalState.get('SUCCESS');

  onData(null, {error, success});

  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(clearErrors, 10000);
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  clearErrors: actions.wishlist.clearErrors,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MainLayout);
