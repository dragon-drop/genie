import React from 'react';
import Login from '/client/modules/accounts/containers/login';
import Register from '/client/modules/accounts/containers/register';

class ShowProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { skuId, wishlistId, wishlistName } = event.target;

    let sku;

    this.props.product.skus.forEach((productSku) => {
      if (productSku._id === skuId.value) {
        sku = productSku;
      }
    });

    if (wishlistId.value === 'new') {
      this.props.addSkuToNewWishlist(this.props.retailerId, wishlistName.value, sku);
    } else {
      this.props.addSkuToWishlist(sku, wishlistId.value, this.props.retailerId);
    }
  }

  render() {
    console.log(this.props);

    const { retailerId, product, wishlists, user, customer, error } = this.props;
    const { skus } = product;

    const formStyle = { border: 'solid 1px black' };

    return (
      <div>
        <h1>Show product</h1>

        <p>Product id: {product._id}</p>

        <div style={formStyle}>

          <form id="addSkuToWishlist" onSubmit={this.handleSubmit}>
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

            {user &&
              <ul>
              {wishlists.map((wishlist) => (
                <li key={wishlist._id} className="wishlist__name">
                  <input type="radio" name="wishlistId" value={wishlist._id} /> {wishlist.name}
                </li>
              ))}
                <li className="wishlist__name">
                  <input type="radio" name="wishlistId" value="new" /> <input type="text" name="wishlistName" placeholder="Wishlist name" />
                </li>
              </ul>
            }

            {user && <button type="submit">Add sku to wishlist</button>}
          </form>

          {!user &&
            <div>
              <h4>Login or register to create a wishlist</h4>
              <Login redirect={`/${retailerId}/products/${product._id}`}></Login>
              <Register redirect={`/${retailerId}/products/${product._id}`}></Register>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default ShowProduct;
