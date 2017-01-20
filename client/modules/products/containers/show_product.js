import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ShowProduct from '../components/show_product.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, FlowRouter, Collections } = context();

  const productId = FlowRouter.getParam('id');
  const retailerId = FlowRouter.getParam('retailerId');

  Meteor.call('product.view', retailerId, productId, (error, response) => {
    if (error) {
      return console.error(error);
    }

    const { product, wishlists } = response;

    onData(null, { product, wishlists, retailerId });
  });
};

export const depsMapper = (context, actions) => ({
  addSkuToWishlist: actions.wishlist.addSkuToWishlist,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ShowProduct);
