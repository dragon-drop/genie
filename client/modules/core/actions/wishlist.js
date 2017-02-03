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
    addSkuToWishlist({Meteor, FlowRouter, LocalState}, sku, wishlistId, retailerId) {
      Meteor.call('wishlist.addSku', wishlistId, sku, retailerId, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }

        return FlowRouter.go(`/${retailerId}/wishlists/${wishlistId}`);
      })
    },
    addSkuToNewWishlist({Meteor, FlowRouter, LocalState}, retailerId, name, sku) {
      Meteor.call('wishlist.createAndAddSku', retailerId, name, sku, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }

        return FlowRouter.go(`/${retailerId}/wishlists/${wishlist._id}`);
      })
    },
    removeSku({Meteor, FlowRouter, LocalState}, wishlistId, skuId) {
      Meteor.call('wishlist.removeSku', wishlistId, skuId, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }
      })
    },
    removeWishlist({Meteor, FlowRouter, LocalState}, wishlistId, retailerId, skuId) {
      Meteor.call('wishlist.remove', wishlistId, (error) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }

        return FlowRouter.go(`/${retailerId}/wishlists/`);
      })
    },
    makePrivate({Meteor, FlowRouter, LocalState}, wishlistId, isPrivate) {
      Meteor.call('wishlist.makePrivate', wishlistId, isPrivate, (error, wishlist) => {
        if(error) {
          console.error(error);
          return LocalState.set('ERROR', error.reason);
        }
      })
    },

}
