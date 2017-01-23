import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ShowProduct from '../components/show_product.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, FlowRouter, Collections } = context();

  const productId = FlowRouter.getParam('id');
  const retailerId = FlowRouter.getParam('retailerId');

  Meteor.call('product.view', retailerId, productId, (callError, response) => {
    if (callError) {
      return console.error(callError);
    }

    if (response.error) {
      console.error(response.error);
    }

    const { product, wishlists, user, customer, error } = response;

    onData(null, { product, wishlists, user, customer, error, retailerId });
  });
};

export const depsMapper = (context, actions) => ({
  addSkuToWishlist: actions.wishlist.addSkuToWishlist,
  addSkuToNewWishlist: actions.wishlist.addSkuToNewWishlist,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ShowProduct);
