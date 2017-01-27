import React, { PropTypes } from 'react';

class Login extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.loginWithFacebook();
  }

  render() {
    return (
      <div>
        <h4>Login or register to create a wishlist</h4>
        <button onClick={this.handleClick}>Login with facebook</button>
        <span> to continue with your wishlist or create an account. </span>
      </div>
    );
  }
}

Login.propTypes = {
  loginWithFacebook: PropTypes.func.isRequired,
};

export default Login;
