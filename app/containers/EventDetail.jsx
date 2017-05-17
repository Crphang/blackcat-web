import React from 'react';
import { connect } from 'react-redux';

import { getEvent } from '../api/EventApi';
import Navbar from '../components/Navbar';

class EventDetail extends React.Component {

  componentDidMount() {
    this.props.getEvent(this.props.routeParams.id);
  }

  render() {
    const id = this.props.routeParams.id;
    if (this.props.events !== undefined && Object.keys(this.props.events).length !== 0) {
      const event = this.props.events[id];

      return (
        <div>
          <Navbar {...this.props} />
          <div>{event.id}</div>
        </div>
      );
    }

    return (
      <Navbar {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => {
      dispatch(getEvent(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
