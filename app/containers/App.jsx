import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEvents } from '../api/EventApi';
import EventRow from '../components/EventRow';

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== undefined) {
      nextProps.getEvents();
    }
  }

  render() {
    // console.log(this.props.events);
    return (
      <div>
        <div>Your App</div>
        { this.props.events &&
          this.props.events.map(event => <EventRow key={event.id} event={event} />) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => {
      dispatch(getEvents());
    },
  };
};

App.propTypes = {
  getEvents: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
