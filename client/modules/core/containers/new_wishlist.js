import { useDeps, composeAll, composeWithTracker, compose } from 'mantra-core';

import NewWishlist from '../components/new_wishlist.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter } = context();

  const retailerId = FlowRouter.getParam('retailerId');

  onData(null, { retailerId });
};

export const depsMapper = (context, actions) => ({
  createWishlist: actions.wishlist.createWishlist,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewWishlist);
