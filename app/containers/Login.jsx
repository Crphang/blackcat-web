import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../api/UserApi';

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
      <div>
        <div>
          <div>FIND THE MOST LOVED ACTIVITIES</div>
          <div>BLACK CATS</div>
          <div>LOGO</div>
          <input type="text" onChange={this.handleUsernameChange} />
          <input type="password" onChange={this.handlePasswordChange} />
        </div>
        <button onClick={() => this.props.login(this.state.username, this.state.password)}>
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
