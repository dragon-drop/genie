import React from 'react';

class NewWishlist extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form id="newWishlistForm">
          <input name="name" />
        </form>
      </div>
    );
  }
}

export default NewWishlist;
