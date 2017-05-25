import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getEvents, getStartDateEndDate } from '../api/EventApi';
import getCategories from '../api/CategoryApi';
import EventRow from '../components/EventRow';

import '../styles/App.scss';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

class App extends React.Component {

  static handleShowSearch() {
    document.getElementById('searchbar').className = 'active';
  }

  constructor() {
    super();

    this.state = {
      selectedDate: 'ANYTIME',
      selectedCategory: 'All',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
    this.props.getCategories();
    const self = this;
    document.addEventListener('scroll', () => {
      const percentage = (document.body.scrollTop + window.innerHeight) / document.body.scrollHeight;
      const values = Object.values(self.props.events);
      const lastEvent = values[values.length - 3];
      const lastPageCount = parseInt(lastEvent.page_count, 10);
      const totalPages = self.props.events.total_pages;
      if (percentage >= 0.98 && lastPageCount < totalPages) {
        const newPageCount = lastPageCount + 1;

        const startDateEndDate = getStartDateEndDate(this.state.selectedDate);
        const startDate = startDateEndDate[0];
        const endDate = startDateEndDate[1];
        console.log(startDate);
        console.log(endDate);
        self.props.getEvents(newPageCount, startDate, endDate, this.state.selectedCategory);
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', true);
    window.removeEventListener('scroll', true);
  }

  handleSearch() {
    const startDateEndDate = getStartDateEndDate(this.state.selectedDate);
    const startDate = startDateEndDate[0];
    const endDate = startDateEndDate[1];

    document.getElementById('searchbar').className = '';
    this.props.getEvents(1, startDate, endDate, this.state.selectedCategory);
  }

  handleSelectDate(selectedDate) {
    this.setState({
      selectedDate,
    });
  }

  handleSelectCategory(selectedCategory) {
    this.setState({
      selectedCategory,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Navbar {...this.props} handleShowSearch={App.handleShowSearch} />
        <SearchBar
          selectedCategory={this.state.selectedCategory}
          selectedDate={this.state.selectedDate}
          handleSearch={this.handleSearch}
          categories={this.props.categories}
          handleSelectDate={this.handleSelectDate}
          handleSelectCategory={this.handleSelectCategory}
        />
        { this.props.events &&
         Object.values(this.props.events).map(event =>
          event !== null && typeof event === 'object' &&
          <EventRow key={event.id} event={event} user={this.props.user} />) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (page = 1, startDate = 0, endDate = 9999999999999, category = 'All') => {
      dispatch(getEvents(page, startDate, endDate, category));
    },
    getCategories: () => {
      dispatch(getCategories());
    },
  };
};

App.propTypes = {
  getEvents: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
