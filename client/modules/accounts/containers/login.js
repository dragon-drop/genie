import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import Login from '../components/login.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter } = context();

  const retailerId = FlowRouter.getParam('retailerId');

  onData(null, { retailerId });
};

export const depsMapper = (context, actions) => ({
  loginWithPassword: actions.login.loginWithPassword,
  loginWithFacebook: actions.login.loginWithFacebook,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Login);
