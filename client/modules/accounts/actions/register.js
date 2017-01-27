export default {
  registerWithPassword({ Meteor, FlowRouter, LocalState }, retailerId, email, password) {
    Accounts.createUser({
        email,
        password,
    });
  },
};
