import React from 'react';

const Layout = ({ content = () => null }) => (
  <div>
    <div id="content">
      {content()}
    </div>
  </div>
);

export default Layout;
