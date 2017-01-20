import React from 'react';

class NewWishlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = event.target;

    this.props.createWishlist(name.value, this.props.retailerId);
  }

  render() {
    return (
      <div>
        <h1>Add wishlist</h1>
        <form id="newWishlistForm" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" placeholder="Name" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default NewWishlist;
