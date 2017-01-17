import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import RetailerIndex from './containers/retailer_index';
import NewRetailer from './containers/new_retailer';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/retailers', {
    name: 'retailers.index',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<RetailerIndex />)
      });
    }
  });

  FlowRouter.route('/retailers/new', {
    name: 'retailers.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewRetailer />)
      });
    }
  });
}
