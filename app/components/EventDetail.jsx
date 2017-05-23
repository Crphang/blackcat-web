import React from 'react';

import '../styles/EventDetail.scss';
import { getShortMonth } from '../api/EventApi';

import Constants from '../Constants';

import FaceRow from './FaceRow';
import CommentsTab from './CommentsTab';

class EventDetail extends React.Component {

  constructor() {
    super();

    this.state = {
      place: '',
    };

    this.loadMap = this.loadMap.bind(this);
  }

  componentDidMount() {
    this.loadMap(this.props.event.latitude, this.props.event.longitude);

  }

  loadMap(latitude, longitude) {
    const uluru = { lat: latitude, lng: longitude };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: uluru,
    });
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

    const geocoder = new google.maps.Geocoder;
    const latlng = {
      lat: latitude,
      lng: longitude,
    };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.setState({ place: results[0] });
      }
    });
  }

  render() {
    const event = this.props.event;
    const startDate = new Date(event.start_date * 1000);

    const startDateStr = startDate.getDate() + ' ' +
                          getShortMonth(startDate.getMonth) + ' ' +
                          startDate.getFullYear();
    const endDate = new Date(event.end_date * 1000);
    const endDateStr = endDate.getDate() + ' ' +
                          getShortMonth(endDate.getMonth) + ' ' +
                          endDate.getFullYear();
    const startTimeStr = startDate.getHours() + ':' + startDate.getMinutes();
    const endTimeStr = endDate.getHours() + ':' + endDate.getMinutes();

    return (
      <div className="eventDetailWrapper">
        <div className="imageCarousel">
          {event.images && event.images.map(image => <img className="image" src={Constants.IMAGES + '/' + image} />)}
        </div>
        <div className="eventDescription">{event.description}</div>
        <hr />
        <div className="eventPeriod">
          <div className="descriptor">
            <div className="purpleLine" />
            <div className="descriptorTitle">When</div>
          </div>
          <div className="time">
            <div className="eventStart">
              <div className="timeTop">
                <img className="timeLogo" src={Constants.STATIC + '/assets/date-from.svg'} />
                <div className="timeDescription">{startDateStr}</div>
              </div>
              <div className="timeBottom">
                {startTimeStr}
              </div>
            </div>
            <div className="verticalLineLong" />
            <div className="eventEnd">
              <div className="timeTop">
                <img className="timeLogo" src={Constants.STATIC + '/assets/date-to.svg'} />
                <div className="timeDescription">{endDateStr}</div>
              </div>
              <div className="timeBottom">
                {endTimeStr}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="eventLocation">
          <div className="descriptor">
            <div className="purpleLine" />
            <div className="descriptorTitle">Where</div>
          </div>
          <div className="location">
            {this.state.place.formatted_address}
          </div>
          <div className="googleMaps" id="map" />
        </div>
        <hr />
        <FaceRow users={event.participants} type="Going" />
        <hr />
        <FaceRow users={event.likes} type="Likes" />
        <hr />
        <div className="CommentsTabWrapper">
          <CommentsTab comments={event.comments} />
        </div>
        <div className="eventActions">
          <div className="leftActions">
            <img onClick={() => this.props.selectComment()} className="commentLogo" src={Constants.STATIC + '/assets/comment-single-purple.svg'} />
            <img onClick={() => this.props.likeEvent(event.id)} className="likeLogo" src={Constants.STATIC + '/assets/like-outline-purple.svg'} />
          </div>
          <div onClick={() => this.props.registerEvent(event.id)} className="rightActions">
            <img className="joinLogo" src={Constants.STATIC + '/assets/check-outline-green.svg'} />
            <div className="join">Join</div>
          </div>
        </div>
      </div>

    );
  }
}

export default EventDetail;
