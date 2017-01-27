import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './containers/main_layout';
import Home from './components/home.jsx';
import NewWishlist from './containers/new_wishlist';
import WishlistIndex from './containers/wishlist_index';
import ShowWishlist from './containers/show_wishlist';

export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/:retailerId/wishlists/new', {
    name: 'wishlists.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewWishlist />)
      });
    }
  });

  FlowRouter.route('/:retailerId/wishlists', {
    name: 'wishlists.index',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<WishlistIndex />)
      });
    }
  });

  FlowRouter.route('/:retailerId/wishlists/:id', {
    name: 'wishlists.show',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ShowWishlist />)
      });
    }
  });
}
