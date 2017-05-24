import React from 'react';

import '../styles/SearchBar.scss';

const SearchBar = ({ selectedCategory, selectedDate, handleSearch, handleSelectDate, handleSelectCategory, categories }) => {
  return (
    <div id="searchbar">
      <div className="searchTitle">
        DATE
      </div>
      <div className="searchItems">
        { selectedDate === 'ANYTIME' &&
          <div onClick={() => handleSelectDate('ANYTIME')} className="searchItem selectedDate ">ANYTIME</div>
        }
        { selectedDate !== 'ANYTIME' &&
          <div onClick={() => handleSelectDate('ANYTIME')} className="searchItem">ANYTIME</div>
        }
        {
          selectedDate === 'TODAY' &&
          <div onClick={() => handleSelectDate('TODAY')} className="searchItem selectedDate">TODAY</div>
        }
        {
          selectedDate !== 'TODAY' &&
          <div onClick={() => handleSelectDate('TODAY')} className="searchItem">TODAY</div>
        }
        {
          selectedDate === 'TOMORROW' &&
          <div onClick={() => handleSelectDate('TOMORROW')} className="searchItem selectedDate">TOMORROW</div>
        }
        {
          selectedDate !== 'TOMORROW' &&
          <div onClick={() => handleSelectDate('TOMORROW')} className="searchItem">TOMORROW</div>
        }
        {
          selectedDate === 'THIS WEEK' &&
          <div onClick={() => handleSelectDate('THIS WEEK')} className="searchItem selectedDate">THIS WEEK</div>
        }
        {
          selectedDate !== 'THIS WEEK' &&
          <div onClick={() => handleSelectDate('THIS WEEK')} className="searchItem">THIS WEEK</div>
        }
        {
          selectedDate === 'THIS MONTH' &&
          <div onClick={() => handleSelectDate('THIS MONTH')} className="searchItem selectedDate">THIS MONTH</div>
        }
        {
          selectedDate !== 'THIS MONTH' &&
          <div onClick={() => handleSelectDate('THIS MONTH')} className="searchItem">THIS MONTH</div>
        }
        {
          selectedDate === 'LATER' &&
          <div onClick={() => handleSelectDate('LATER')} className="searchItem selectedDate">LATER</div>
        }
        {
          selectedDate !== 'LATER' &&
          <div onClick={() => handleSelectDate('LATER')} className="searchItem">LATER</div>
        }
      </div>
      <div className="searchTitle">
        Category
      </div>
      <div className="searchItems">
        {selectedCategory !== 'All' && <div className="categoryItem">All</div>}
        {selectedCategory === 'All' && <div className="categoryItem selectedCategory">All</div>}
        {categories &&
          categories.map((category) => {
            if (selectedCategory === category.id) {
              return <div onClick={() => handleSelectCategory(category.id)}className="categoryItem selectedCategory">{category.name}</div>;
            }
            return <div onClick={() => handleSelectCategory(category.id)} className="categoryItem">{category.name}</div>;
          })}
      </div>
      <div className="search" onClick={() => handleSearch()}>Search</div>
    </div>
  );
};

export default SearchBar;
