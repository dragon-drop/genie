import React from 'react';

const Layout = ({ content = () => null }) => (
  <div>
    <div id="content">
      {content()}
    </div>
    <footer>
    <hr />
      <ul>
        <li><a href="/app/retailers">Retailers</a></li>
        <li><a href="/app/customers">Customers</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </footer>
  </div>
);

export default Layout;
