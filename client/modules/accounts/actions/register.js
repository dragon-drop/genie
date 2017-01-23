export default {
  registerWithPassword({ Meteor, FlowRouter, LocalState }, retailerId, email, password, redirect) {
    Accounts.createUser({
        email,
        password
    });

    return FlowRouter.go((redirect || `/${retailerId}`) + '?loggedIn');
  },
};
