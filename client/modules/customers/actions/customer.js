import notifications from '/client/notifications';

export default {
  createCustomer({ Meteor, FlowRouter, LocalState}, userId, retailerId) {
    Meteor.call('customer.create', userId, retailerId, (error, customer) => {
      if(error) {
        console.error(error);
        return LocalState.set('ERROR', notifications.error[error.error]);
      }

      return FlowRouter.go(`/${retailerId}/wishlists`);
    })
  },
}
