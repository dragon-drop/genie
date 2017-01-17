import React from 'react';

class NewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { retailerId, userId } = event.target;

    this.props.createCustomer(userId.value, retailerId.value);
  }

  render() {
    return (
      <div>
        <h1>Add customer</h1>
        <form id="newCustomerForm" onSubmit={this.handleSubmit}>
          <label htmlFor="userId">User id:</label>
          <input id="userId" name="userId" placeholder="User id" />

          <label htmlFor="retailerId">Retailer id:</label>
          <input id="retailerId" name="retailerId" placeholder="Retailer id" />

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default NewCustomer;
