import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEvents } from '../api/EventApi';
import EventRow from '../components/EventRow';

import '../styles/App.scss';
import Navbar from '../components/Navbar';

class App extends React.Component {

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <div className="wrapper">
        <Navbar { ...this.props }/>
        { this.props.events &&
          this.props.events.map(event => <EventRow key={event.id} event={event} user={this.props.user}/>) }
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
