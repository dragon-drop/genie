import React from 'react';

class NewRetailer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, slug } = event.target;

    this.props.createRetailer(slug.value, name.value);
  }

  render() {
    return (
      <div>
        <h1>Add retailer</h1>
        <form id="newRetailerForm" onSubmit={this.handleSubmit}>
          <label htmlFor="slug">Slug:</label>
          <input id="slug" name="slug" placeholder="Slug" />

          <label htmlFor="name">Name:</label>
          <input id="name" name="name" placeholder="Name" />

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default NewRetailer;
