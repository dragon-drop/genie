import React from 'react';

class ShowWishlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { wishlist, retailerId } = this.props;
    const { skus } = wishlist;

    return (
      <div>
        <a href={`/${retailerId}/wishlists`}>My Wishlists</a> / <span>{wishlist.name}</span>

        <h1>{wishlist.name}</h1>

        <p>Wishlist id: {wishlist._id}</p>

        <h2>Skus</h2>

        <ul>
        {skus.map((sku) => (
          <li key={sku._id} className="sku__name">
            {sku._id}, from product {sku.productId}
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default ShowWishlist;
