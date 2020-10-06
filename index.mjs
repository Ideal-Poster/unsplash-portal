import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import ReactDOM from 'react-dom';
import React from 'react';

const domContainer = document.querySelector('#image__list');
ReactDOM.render(React.createElement(ImageList), domContainer);

const searchBar = document.querySelector('#search__form');
new SearchBar(searchBar);
