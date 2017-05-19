import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

import '../styles/User.scss';
import Constants from '../Constants';
import EventRow from '../components/EventRow';

class User extends React.Component {

  constructor() {
    super();

    this.state = {
      selected: 'Likes',
    };

    this.renderSelectedEvents = this.renderSelectedEvents.bind(this);
    this.handleSelectType = this.handleSelectType.bind(this);
  }

  handleSelectType(selected) {
    this.setState({
      selected,
    });
  }

  renderSelectedEvents() {
    if (this.state.selected === 'Likes') {
      return Object.values(this.props.user.liked_events).map(event =>
        <EventRow
          key={event.id} user={this.props.user} event={event} />);
    }

    if (this.state.selected === 'Going') {
      return Object.values(this.props.user.participating_events).map(event =>
        <EventRow
          key={event.id} user={this.props.user} event={event} />);     
    }
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <div className="userDetailWrapper">
          <img className="userLogo" src={Constants.STATIC + '/assets/orange-dp.jpg'} />
          <div className="userName">{this.props.user.name}</div>
          <div className="email">
            <img className="emailLogo" src={Constants.STATIC + '/assets/email.svg'} />
            <div className="userEmail">{this.props.user.email}</div>
          </div>
          <div className="horizontalLine" />
          <div className="tabs">
            <div onClick={() => this.handleSelectType('Likes')} className="tabLeft">
              {this.state.selected === 'Likes' &&
                <div>
                  <img className="tabLogo" src={Constants.STATIC + '/assets/like.svg'} />
                  <div className="tabTextFilled">{Object.keys(this.props.user.liked_events).length} Likes</div> 
                </div>
              }

              {this.state.selected !== 'Likes' &&
                <div>
                  <img className="tabLogo" src={Constants.STATIC + '/assets/like-outline.svg'} />
                  <div className="tabTextEmpty">{Object.keys(this.props.user.liked_events).length} Likes</div>
                </div>
              }
            </div>
            <div className="verticalLine" />
            <div onClick={() => this.handleSelectType('Going')} className="tabMiddleShort">
              {this.state.selected === 'Going' &&
                <div>
                  <img className="tabLogo" src={Constants.STATIC + '/assets/check.svg'} />
                  <div className="tabTextFilled">{Object.keys(this.props.user.participating_events).length} Going</div>
                </div>
              }
              {this.state.selected !== 'Going' &&
                <div>
                  <img className="tabLogo" src={Constants.STATIC + '/assets/check-outline.svg'} />
                  <div className="tabTextEmpty">{Object.keys(this.props.user.participating_events).length} Going</div>
                </div>
              }
            </div>
            <div className="verticalLine" />
            <div className="tabRight">
              <img className="tabLogo" src={Constants.STATIC + '/assets/past-outline.svg'} />
              <div className="tabTextEmpty">0 Past</div>
            </div>
          </div>
          <div className="horizontalLine" />
          <div className="EventsWrapper">
            {this.renderSelectedEvents()}
          </div>
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

export default connect(mapStateToProps, null)(User);
