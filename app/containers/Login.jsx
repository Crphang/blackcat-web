import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../api/UserApi';
import Constants from '../Constants';

import '../styles/Login.scss';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <div className="loginWrapper">
        <img className="backgroundLogin" src={Constants.STATIC + '/assets/Street-Dance-01.jpg'} />
        <div className="backgroundColor">
          <div className="loginSlogan">FIND THE MOST LOVED ACTIVITIES</div>
          <div className="brandName">BLACK CATS</div>
          <img className="loginLogo" src={Constants.STATIC + '/assets/logo-cat.svg'} />
          <input className="loginField" placeholder="Username" type="text" onChange={this.handleUsernameChange} />
          <input className="loginField" placeholder="Password" type="password" onChange={this.handlePasswordChange} />
        </div>
        <button className="signIn" onClick={() => this.props.login(this.state.username, this.state.password)}>
          SIGN IN
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    },
  };
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};


export default connect(null, mapDispatchToProps)(Login);
