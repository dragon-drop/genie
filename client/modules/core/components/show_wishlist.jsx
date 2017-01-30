import React from 'react';

class ShowWishlist extends React.Component {
  handleCheckboxChange = (event) => {
    event.preventDefault();
    const checkbox = event.target;

    this.props.makePrivate(this.props.wishlist._id, checkbox.checked);
  }

  removeSku = (event) => {
    event.preventDefault();
    const { skuId } = event.target;

    this.props.removeSku(this.props.wishlist._id, skuId.value);
  }

  render() {
    const { wishlist, retailerId, isOwner } = this.props;
    const { skus } = wishlist;

    const canViewWishlist = isOwner || !wishlist.private;

    return (
      <div>

        {!canViewWishlist && <p>This is a private wishlist</p>}

        {canViewWishlist && (
          <div>
            <a href={`/${retailerId}/wishlists`}>My Wishlists</a> / <span>{wishlist.name}</span>

            <h1>{wishlist.name}</h1>

            <p>Wishlist id: {wishlist._id}</p>

            {isOwner && (
              <p>
                Private wishlist:
                <input type="checkbox" name="private" value="true" checked={wishlist.private} onChange={this.handleCheckboxChange} />
              </p>
            )}

            {!wishlist.private && (
              <p>
                Share this wishlist with this URL:
                <input type="text" defaultValue={window.location.href} style={{ "width": "300px" }} />
              </p>
            )}

            <h2>Skus</h2>

            <ul>
            {skus.map((sku) => (
              <li key={sku._id} className="sku__name">
                {sku._id}, from product {sku.productId}
                <form onSubmit={this.removeSku}>
                  <input type="hidden" name="skuId" defaultValue={sku._id} />
                  <button>Remove</button>
                </form>
              </li>
            ))}
            </ul>
          </div>
        )}

      </div>
    );
  }
}

export default ShowWishlist;
