import React, { PropTypes } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, redirect } = event.target;

    this.props.loginWithPassword(this.props.retailerId, email.value, password.value, redirect.value);
  }

  render() {
    const { redirect } = this.props;

    return (
      <div>
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <input type="hidden" name="redirect" value={redirect} />
          <input placeholder="email" type="email" name="email" />
          <input placeholder="Password" type="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
};

export default Login;
