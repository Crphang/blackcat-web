import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

import '../styles/UserDetail.scss';

class UserDetail extends React.Component {

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <div className="userDetailWrapper">
          User Detail
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(UserDetail);
