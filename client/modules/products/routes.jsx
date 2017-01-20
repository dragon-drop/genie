import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';
import ShowProduct from './containers/show_product';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/:retailerId/products/:id', {
    name: 'products.show',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ShowProduct />)
      });
    }
  });
}
