import notifications from '/client/notifications';

export default {
  loginWithPassword({ Meteor, FlowRouter, LocalState }, retailerId, email, password) {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error(error);
        return LocalState.set('ERROR', error.reason);
      }
    });
  },
  loginWithFacebook({ Meteor, FlowRouter, LocalState }) {
    Meteor.loginWithFacebook({ requestPermissions: [] }, (error) => {
      if (error) {
        console.error(error);
        return LocalState.set('ERROR', error.reason);
      }
      const retailerId = FlowRouter.getParam('retailerId');

      Meteor.call('customer.getCurrent', retailerId, (error, customer) => {
        if (!customer) {
          Meteor.call('customer.create', Meteor.userId(), retailerId, (error) => {
            if (error) {
              console.error(error);
              return LocalState.set('ERROR', error.reason);
            }

            LocalState.set('SUCCESS', notifications.account.loggedIn);
            console.info('created new customer');
          });
        } else {
          LocalState.set('SUCCESS', notifications.account.loggedIn);
          console.info('customer already exists');
        }
      });
    });
  },
};
