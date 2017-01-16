import React from 'react';

class WishlistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { wishlists } = this.props;
    const productsString = function (skus) {
      return `${skus.length} product${skus.length !== 1 ? 's' : ''}`;
    }

    return (
      <div id="wishlists">
        <h1>My Wishlists</h1>

        <ul>
        {wishlists.map((wishlist) => (
          <li key={wishlist._id} className="wishlist">
            <h2>
              <a href={`/wishlists/${wishlist._id}`}>
                <span className="wishlist__name">{wishlist.name} </span>
                <span>({productsString(wishlist.skus)})</span>
              </a>
            </h2>
          </li>
        ))}
        </ul>

        <a href="/wishlists/new">Add wishlist</a>
      </div>
    );
  }
}

export default WishlistIndex;
