export default {
  loginWithPassword({ Meteor, FlowRouter, LocalState }, retailerId, email, password, redirect) {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error(error);
        return LocalState.set('ERROR', error.reason);
      }

      return FlowRouter.redirect(( redirect || `/${retailerId}` ) + '?loggedIn');
    });
  },
};
