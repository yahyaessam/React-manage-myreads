import React from 'react';
import SearchBooks from './components/search-component/SearchBooks';
import Home from './components/home-component/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css';


class BooksApp extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBooks />} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
