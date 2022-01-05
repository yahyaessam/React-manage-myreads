import './SearchBooks.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../home-component/book-shelf-component/book-card-component/BookCard';
import * as BooksApI from '../../BooksAPI';
class SearchBooks extends Component {
  state = {
    books: []
  }
  timeout = null;
  onSearch(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      BooksApI.search(e.target.value).then(books => {
        this.setState({books})
      });
    }, 1000);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => { this.onSearch(e) }} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.map(book => <li key={book.id}><BookCard book={book} /></li>)
            }  
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;