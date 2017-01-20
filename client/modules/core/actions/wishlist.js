export default {
    createWishlist({ Meteor, FlowRouter, LocalState}, name, retailerId) {
      Meteor.call('customer.createWishlist', name, retailerId, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }

        return FlowRouter.go(`/${retailerId}/wishlists/${wishlist._id}`);
      })
    },
    addSkuToWishlist({Meteor, FlowRouter, LocalState}, skuId, wishlistId, retailerId) {
      Meteor.call('wishlist.addSku', wishlistId, skuId, retailerId, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }

        return FlowRouter.go(`/${retailerId}/wishlists/${wishlistId}`);
      })
    }
}
