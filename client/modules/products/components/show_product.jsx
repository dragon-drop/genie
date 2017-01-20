import React from 'react';

class ShowProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { skuId, wishlistId } = event.target;

    let sku;

    this.props.product.skus.forEach((productSku) => {
      if (productSku._id === skuId.value) {
        sku = productSku;
      }
    });

    this.props.addSkuToWishlist(sku, wishlistId.value, this.props.retailerId);
  }

  render() {
    const product = this.props.product;
    const { skus } = product;
    const wishlists = this.props.wishlists;

    const formStyle = { border: 'solid 1px black' };

    return (
      <div>
        <h1>Show product</h1>

        <p>Product id: {product._id}</p>

        <form id="addSkuToWishlist" onSubmit={this.handleSubmit} style={formStyle}>
          <h2>Add sku to wishlist</h2>

          <h3>Skus</h3>

          <ul>
          {skus.map((sku) => (
            <li key={sku._id} className="sku__name">
              <input type="radio" name="skuId" value={sku._id} /> {sku._id}
            </li>
          ))}
          </ul>

          <h3>Wishlists</h3>

          <ul>
          {wishlists.map((wishlist) => (
            <li key={wishlist._id} className="wishlist__name">
              <input type="radio" name="wishlistId" value={wishlist._id} /> {wishlist.name}
            </li>
          ))}
          </ul>

          <button type="submit">Add</button>

        </form>
      </div>
    );
  }
}

export default ShowProduct;
