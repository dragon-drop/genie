import React, { PropTypes } from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target;

    this.props.registerWithPassword(this.props.retailerId, email.value, password.value);
  }

  render() {
    return (
      <div>
        <form id="registerForm" onSubmit={this.handleSubmit}>
          <input placeholder="email" type="email" name="email" />
          <input placeholder="Password" type="password" name="password" />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;