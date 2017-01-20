import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import CustomerIndex from './containers/customer_index';
import NewCustomer from './containers/new_customer';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/app/customers', {
    name: 'customers.index',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<CustomerIndex />)
      });
    }
  });

  FlowRouter.route('/app/customers/new', {
    name: 'customers.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewCustomer />)
      });
    }
  });
}
