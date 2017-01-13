export default {
  loginWithPassword({ Meteor, FlowRouter, LocalState }, email, password) {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.error(error);
        return LocalState.set('ERROR', error.reason);
      }

      return FlowRouter.go('/wishlists');
    });
  },
};
