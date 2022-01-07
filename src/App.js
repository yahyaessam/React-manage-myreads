import React from 'react';
import SearchBooks from './components/search-component/SearchBooks';
import Home from './components/home-component/Home';
import { Routes, Route } from 'react-router-dom';
import BucketComponent from './components/bucket-component/BucketComponent';
import './App.css';



class BooksApp extends React.Component {
  state = {
    selectBook: false
  }
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  selectBookEvent = (e, afterMove) => {
    this.setState({ selectBook: e });
    const location = window.location;
    if(afterMove === 'afterMove' && location.pathname !== "/search") this.myRef.current.getAllBooks()
    if(afterMove === 'afterMove' && location.pathname === "/search") window.location.pathname="/" 
  }
  render() {
    return (
      <div  className="app"  >
        <span className='test' ></span>
        <Routes>
          <Route path="/" element={<Home selectBookEvent={(e) => this.selectBookEvent(e)} ref={this.myRef} />} />
          <Route path="/search" element={<SearchBooks selectBook={(e) => this.selectBookEvent(e)} />} />
        </Routes>
        <BucketComponent select={this.state.selectBook} afterMove={(e) => this.selectBookEvent(false, 'afterMove')} />
      </div>
    )
  }
}

export default BooksApp
