import React from 'react';
import { Link } from 'react-router';

import '../styles/EventRow.scss';
import { getShortMonth } from '../api/EventApi';
import Constants from '../Constants';

export default function EventRow({ event, user }) {
  const startDate = new Date(event.start_date * 1000);
  const startDateStr = startDate.getDate() + ' ' +
                        getShortMonth(startDate.getMonth) + ' ' +
                        startDate.getFullYear() + ' ' +
                        startDate.getHours() + ':' + startDate.getMinutes();
  const endDate = new Date(event.end_date * 1000);
  const endDateStr = endDate.getDate() + ' ' +
                        getShortMonth(endDate.getMonth) + ' ' +
                        endDate.getFullYear() + ' ' +
                        endDate.getHours() + ':' + endDate.getMinutes();

  const isLiked = user.liked_events[event.id] !== undefined;
  const isParticipating = user.participating_events[event.id] !== undefined;

  return (
    <div className="eventContainer">
      <Link to={`/event/${event.id}`} >
        <div className="eventTitle">{event.title}</div>
        <img src={Constants.STATIC + '/assets/time.svg'} className="eventClock" />
        <div className="eventTime">{startDateStr} - {endDateStr}</div>
        <div className="eventDescription">{event.description}</div>

        <div className="eventLikeJoin">
          {isParticipating &&
            <div className="inlineWrapper">
              <img src={Constants.STATIC + '/assets/check.svg'} className="eventClock" />
              <div className="eventFilled">I am Going!</div>
            </div> }
          {!isParticipating &&
            <div className="inlineWrapper">
              <img src={Constants.STATIC + '/assets/check-outline.svg'} className="eventClock" />
              <div className="eventEmpty">{event.participants_count} Going</div> 
            </div>}
            <div className="seperator" />
          {isLiked &&
            <div className="inlineWrapper">
              <img src={Constants.STATIC + '/assets/like-red.svg'} className="eventClock" />
              <div className="eventFilled">I like it</div>
            </div>
          }
          {!isLiked &&
            <div className="inlineWrapper">
              <img src={Constants.STATIC + '/assets/like-outline.svg'} className="eventClock" />
              <div className="eventEmpty">{event.likes_count} Likes</div>
            </div>
          }
        </div>
      </Link>
      <hr />
    </div>
  );
}
