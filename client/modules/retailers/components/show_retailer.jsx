import React from 'react';
import Login from '/client/modules/accounts/containers/login';
import Register from '/client/modules/accounts/containers/register';

class ShowRetailer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.createCustomer(this.props.userId, this.props.retailer._id);
  }

  render() {
    const { userId, retailer } = this.props;

    return (
      <div>
        <h1>{retailer.name}</h1>

        {userId &&
          <form id="newCustomerForm" onSubmit={this.handleSubmit}>
            <button type="submit">Become a customer</button>
          </form>
        }

        {!userId &&
          <div>
            <Login></Login>
          </div>
        }
      </div>
    );
  }
}

export default ShowRetailer;
