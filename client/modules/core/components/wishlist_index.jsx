import React from 'react';

class WishlistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>My Wishlists</h1>
        <div className="wishlist__name"></div>
      </div>
    );
  }
}

export default WishlistIndex;
