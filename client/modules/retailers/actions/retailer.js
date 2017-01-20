export default {
  createRetailer({ Meteor, FlowRouter, LocalState}, _id, name) {
    Meteor.call('retailer.create', { _id, name }, (error, retailer) => {
      if(error) {
        console.error(error);
        return LocalState.set('ERROR', error.reason);
      }

      return FlowRouter.go(`/${retailer._id}`);
    })
  },
}
