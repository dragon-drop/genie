import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import WishlistIndex from '../components/wishlist_index.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  Meteor.call('customer.getWishlists', (error, wishlists) => {
    if (error) {
      return console.error(error);
    } 

    onData(null, { wishlists });
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(WishlistIndex);
