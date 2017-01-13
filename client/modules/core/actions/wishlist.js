export default {
    createWishlist({ Meteor, FlowRouter, LocalState}, name) {
      Meteor.call('customer.createWishlist', name, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }

        return FlowRouter.go('/wishlists');
      })
    },
    addSkuToWishlist({Meteor, FlowRouter, LocalState}, skuId, wishlistId) {
      Meteor.call('wishlist.addSku', wishlistId, skuId, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }

        return FlowRouter.go('/wishlists');
      })
    }
}
