import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import CustomerIndex from '../components/customer_index.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  Meteor.call('customer.getAll', (error, customers) => {
    if (error) {
      return console.error(error);
    }

    const customersWithEmail = customers.map((customer) => {
        const user = Meteor.users.findOne({_id: customer.userId});
        customer.email = user.emails[0].address;
        return customer;
    });

    onData(null, { customers: customersWithEmail });
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(CustomerIndex);
