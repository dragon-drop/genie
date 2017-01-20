import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ShowWishlist from '../components/show_wishlist.jsx';

export const composer = ({context}, onData) => {
  const { Meteor, FlowRouter, Collections } = context();

  const wishlistId = FlowRouter.getParam('id');
  const retailerId = FlowRouter.getParam('retailerId');

  Meteor.call('wishlist.view', wishlistId, (error, wishlist) => {
    if (error) {
      return console.error(error);
    }

    onData(null, { wishlist, retailerId });
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ShowWishlist);
