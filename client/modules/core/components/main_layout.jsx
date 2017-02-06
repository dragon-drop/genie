import React from 'react';

class Layout extends React.Component {
  render() {
    const { error, success, content } = this.props;

    const gutter = 20;
    const notification = (color) => ({
      position: 'fixed',
      top: gutter + 'px',
      right: gutter + 'px',
      width: '200px',
      textAlign: 'center',
      padding: gutter + 'px',
      color,
      background: '#eee',
    });

    return (
      <div>
        <header>
          {error && <p style={notification('red')}>{error}</p>}
          {success && <p style={notification('green')}>{success}</p>}
        </header>
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
  }
}

export default Layout;
