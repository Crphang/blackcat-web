import React from 'react';
import { Link } from 'react-router';
import '../styles/Navbar.scss';
import Constants from '../Constants';

export default function Navbar(props) {
  const path = props.route.path;
  const handleShowSearch = props.handleShowSearch;

  if (path === '/') {
    return (
      <div className="bar">
        <img
          onClick={() => handleShowSearch(true)}
          className="searchLogo"
          src={Constants.STATIC + '/assets/search.svg'}
        />
        <img className="mainLogo" src={Constants.STATIC + '/assets/logo-cat.svg'} />
        <Link to="/me"><img className="meLogo" src={Constants.STATIC + '/assets/orange-dp.jpg'} /></Link>
      </div>
    );
  }

  return (
    <div className="bar">
      <Link to="/"><img className="homeLogo" src={Constants.STATIC + '/assets/home.svg'} /></Link>
      <img className="mainLogo" src={Constants.STATIC + '/assets/logo-cat.svg'} />
      <Link to="/me"><img className="meLogo" src={Constants.STATIC + '/assets/orange-dp.jpg'} /></Link>
    </div>
  );
}
