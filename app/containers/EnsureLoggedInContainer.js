import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const isLoggedIn = (user) => {
  if (user && user !== undefined && user.access_token !== ''
       && user.access_token !== undefined && user.access_token.length > 0) {
    return true;
  }

  return false;
};

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL, user } = this.props;

    if (!isLoggedIn(user)) {
      dispatch(push('/login'));
    }
  }

  render() {
    if (isLoggedIn(this.props.user)) {
      return this.props.children;
    }

    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    currentURL: ownProps.location.pathname,
  };
};

export default connect(mapStateToProps, null)(EnsureLoggedInContainer);
