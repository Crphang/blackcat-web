import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

class UserDetail extends React.Component {

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <div>User Detail</div>
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
