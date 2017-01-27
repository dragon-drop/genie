export default {
  loginWithPassword({ Meteor, FlowRouter, LocalState }, retailerId, email, password) {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error(error);
        return LocalState.set('ERROR', error.reason);
      }
    });
  },
};
