import React from 'react';
import {Meteor} from 'meteor/meteor';
import { mount } from 'react-mounter';

import MainLayout from '/client/modules/core/components/main_layout.jsx';

export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/logout', {
    name: 'logout',
    action() {
      Meteor.logout();
      FlowRouter.go('/');
    }
  });
}
