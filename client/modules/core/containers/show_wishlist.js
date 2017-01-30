import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ShowWishlist from '../components/show_wishlist.jsx';

export const composer = ({context}, onData) => {
  const { Meteor, FlowRouter, Collections } = context();

  const wishlistId = FlowRouter.getParam('id');
  const retailerId = FlowRouter.getParam('retailerId');

  const userId = Meteor.userId();
  console.log({userId});

  if (Meteor.subscribe('wishlist', wishlistId).ready()) {
    const wishlist = Collections.Wishlists.findOne(wishlistId);

    console.log({wishlist});

    if (Meteor.subscribe('customer', retailerId, userId).ready()) {
      const currentCustomer = Collections.Customers.findOne({ retailerId, userId });

      console.log({ retailerId, userId, currentCustomer });

      if (!currentCustomer) {
        Meteor.logout();
      }

      const isOwner = currentCustomer && (currentCustomer._id  === wishlist.customerId);

      onData(null, { wishlist, retailerId, currentCustomer, isOwner });
    }
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  makePrivate: actions.wishlist.makePrivate,
  removeSku: actions.wishlist.removeSku,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ShowWishlist);
