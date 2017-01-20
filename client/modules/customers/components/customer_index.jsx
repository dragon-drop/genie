import React from 'react';

class CustomerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customers } = this.props;

    return (
      <div id="customers">
        <h1>Customers</h1>

        <ul>
        {customers.map((customer) => (
          <li key={customer._id} className="customer">
            <h2>
                <span>email</span>: {customer.email} <br/>
                <span>retailerId</span>: {customer.retailerId} <br/>
            </h2>
            <p>
                <span>userId</span>: {customer.userId} <br/>
                <span>_id</span>: {customer._id} <br/>
            </p>
          </li>
        ))}
        </ul>

        <a href="/app/customers/new">Add customer</a>
      </div>
    );
  }
}

export default CustomerIndex;
