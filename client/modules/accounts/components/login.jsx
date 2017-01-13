import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) { 
    event.preventDefault();
    const { email, password } = event.target;

    this.props.loginWithPassword(email.value, password.value);
 }

  render() {
    return (
      <div>
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <input placeholder="email" type="email" name="email" />
          <input placeholder="Password" type="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
