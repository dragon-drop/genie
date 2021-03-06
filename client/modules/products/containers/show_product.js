import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import ShowProduct from '../components/show_product.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, FlowRouter, Collections } = context();

  const productId = FlowRouter.getParam('id');

  Meteor.call('product.view', productId, (error, response) => {
    if (error) {
      return console.error(error);
    }

    const { product, wishlists } = response;

    onData(null, { product, wishlists });
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
