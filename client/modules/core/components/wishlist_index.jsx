import React from 'react';

class WishlistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { wishlists } = this.props;

    return (
      <div id="wishlists">
        <h1>My Wishlists</h1>

        <ul>
        {wishlists.map((wishlist) => (
          <li key={wishlist._id} className="wishlist">
            <h2 className="wishlist__name">{wishlist.name}</h2>
            <p>{wishlist.skus.length} products</p>
          </li>
        ))}
        </ul>

        <a href="/wishlists/new">Add wishlist</a>
      </div>
    );
  }
}

export default WishlistIndex;
