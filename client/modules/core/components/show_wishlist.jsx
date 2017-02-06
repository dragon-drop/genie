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

  removeWishlist = (event) => {
    event.preventDefault();

    this.props.removeWishlist(this.props.wishlist._id, this.props.retailerId);
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
              <div>
                <form onSubmit={this.removeWishlist}>
                  <button>Remove wishlist</button>
                </form>

                <p>
                  Private wishlist:
                  <input type="checkbox" name="private" value="true" checked={wishlist.private} onChange={this.handleCheckboxChange} />
                </p>
              </div>
            )}

            {!wishlist.private && isOwner && (
              <p>
                Share this wishlist with this URL:
                <input type="text" defaultValue={window.location.href} style={{ "width": "300px" }} />
              </p>
            )}

            <h2>Products</h2>

            <ul>
            {skus.map((sku) => (
              <li key={sku._id} className="sku__name">
                <a target="_blank" href={sku.product_url}>{sku.name} (variant {sku._id})</a>
                {isOwner && (
                  <form onSubmit={this.removeSku}>
                    <input type="hidden" name="skuId" defaultValue={sku._id} />
                    <button>Remove</button>
                  </form>
                )}
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
