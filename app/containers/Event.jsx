import React from 'react';
import { connect } from 'react-redux';

import { getEvent, likeEvent, registerEvent, commentEvent } from '../api/EventApi';
import Navbar from '../components/Navbar';
import EventDetail from '../components/EventDetail';
import ParticipantsDetail from '../components/ParticipantsDetail';
import CommentsDetail from '../components/CommentsDetail';
import Constants from '../Constants';

import '../styles/Event.scss';

class Event extends React.Component {

  constructor() {
    super();
    this.state = {
      selected: 'Details',
    };

    this.handleSelectType = this.handleSelectType.bind(this);
  }

  componentDidMount() {
    this.props.getEvent(this.props.routeParams.id);
  }

  handleSelectType(selected) {
    this.setState({
      selected,
    });
  }

  render() {
    const id = this.props.routeParams.id;
    if (this.props.events !== undefined && Object.keys(this.props.events).length !== 0) {
      const event = this.props.events[id];

      return (
        <div>
          <Navbar {...this.props} />
          <div className="eventWrapper">
            <div className="eventTitle">{event.title}</div>
            <div className="eventCreator">
              <img className="creatorImage" src={Constants.STATIC + '/assets/orange-dp.jpg'} />
              <div className="creatorDetail">
                <div className="eventCreatorUsername">Username</div>
                <div className="eventCreateTime">Published 2 days ago</div>
              </div>
            </div>
            <div className="horizontalLine" />
            <div className="tabs">
              <div onClick={() => this.handleSelectType('Details')} className='tabLeft'>
                {this.state.selected === 'Details' &&
                  <div>
                    <img className="tabLogo" src={Constants.STATIC + '/assets/info.svg'} />
                    <div className="tabTextFilled">Details</div>
                  </div>
                }
                {this.state.selected !== 'Details' &&
                  <div>
                    <img className="tabLogo" src={Constants.STATIC + '/assets/info-outline.svg'} />
                    <div className="tabTextEmpty">Details</div>                
                  </div>
                }
              </div>
              <div className="verticalLine" />
              <div onClick={() => this.handleSelectType('Participants')} className='tabMiddle'>
                {this.state.selected === 'Participants' &&
                  <div>
                    <img className="tabLogo" src={Constants.STATIC + '/assets/people.svg'} />
                    <div className="tabTextFilled">Participants</div>
                  </div>
                }
                {this.state.selected !== 'Participants' &&
                  <div>
                    <img className="tabLogo" src={Constants.STATIC + '/assets/people-outline.svg'} />
                    <div className="tabTextEmpty">Participants</div>
                  </div>
                }
              </div>
              <div className="verticalLine" />
              <div onClick={() => this.handleSelectType('Comments')} className='tabRight'>
                {this.state.selected === 'Comments' &&
                  <div>
                    <img className="tabLogo" src={Constants.STATIC + '/assets/comment.svg'} />
                    <div className="tabTextFilled">Comments</div>
                  </div>
                }
                {this.state.selected !== 'Comments' &&
                  <div>
                    <img className="tabLogo" src={Constants.STATIC + '/assets/comment-outline.svg'} />
                    <div className="tabTextEmpty">Comments</div>
                  </div>
                }
              </div>
            </div>
            <div className="horizontalLine" />
            {this.state.selected === 'Details' &&
              <EventDetail
                event={event}
                likeEvent={(id) => this.props.likeEvent(id)}
                registerEvent={(id) => this.props.registerEvent(id)}
                selectComment={() => this.handleSelectType('Comments')}
              />
            }
            {this.state.selected === 'Participants' &&
              <ParticipantsDetail event={event} />
            }
            {this.state.selected === 'Comments' &&
              <CommentsDetail event={event} commentEvent={this.props.commentEvent} />
            }
          </div>
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
    likeEvent: (id) => {
      dispatch(likeEvent(id));
    },
    commentEvent: (id, comment) => {
      dispatch(commentEvent(id, comment));
    },
    registerEvent: (id) => {
      dispatch(registerEvent(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
