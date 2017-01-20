import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

import Register from '../components/register.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter } = context();

  const retailerId = FlowRouter.getParam('retailerId');

  onData(null, { retailerId });
};

export const depsMapper = (context, actions) => ({
  registerWithPassword: actions.register.registerWithPassword,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Register);
