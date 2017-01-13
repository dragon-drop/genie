import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/main_layout.jsx';
import Home from './components/home.jsx';
import NewWishlist from './containers/new_wishlist';
import WishlistIndex from './containers/wishlist_index';

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

  FlowRouter.route('/wishlists/new', {
    name: 'wishlists.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewWishlist />)
      });
    }
  });

  FlowRouter.route('/wishlists', {
    name: 'wishlists.index',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<WishlistIndex />)
      });
    }
  });
}
