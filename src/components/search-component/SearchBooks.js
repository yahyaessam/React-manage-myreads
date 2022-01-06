import './SearchBooks.css';
import LoadingOverlay from 'react-loading-overlay';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../home-component/book-shelf-component/book-card-component/BookCard';
import * as BooksApI from '../../BooksAPI';

class SearchBooks extends Component {
  state = {
    books: [],
    query: '',
    spinner: false
  }
  timeout = null;
  onSearch(e) {
    let allBooks = JSON.parse(localStorage.getItem('books'));
    let searchQuery = e.target.value.trim();

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ spinner: true })
      if (e.target.value.trim() !== '') {
        BooksApI.search(searchQuery).then(books => {
          let cleanBooks = Array.isArray(books) &&
            books.filter(book => (book.imageLinks && book.imageLinks.thumbnail !== undefined) ? book : '');
          if (cleanBooks) {
            cleanBooks.map(book => {
              let storageBook = allBooks.find(storageBook => storageBook.id === book.id)
              if (storageBook) {
                return book.shelf = storageBook.shelf;
              } else {
                return book;
              }
            })
          }
          this.setState({ books: cleanBooks, query: searchQuery });
          this.setState({ spinner: false });
        });
      } else {
        this.setState({ books: [], query: '' });
        this.setState({ spinner: false });
      }
    }, 1000);
  }

  handleShelfChange = () => {
    BooksApI.search(this.state.query).then(books => {
      this.setState({ books });
    });

  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => { this.onSearch(e) }} />

          </div>
        </div>
        <LoadingOverlay
          active={this.state.spinner}
          spinner
          text='Loading your content...'>
          <div className="search-books-results">
            <ol className={`books-grid ${this.state.query === '' ? 'display-none' : ''}`} >
              {
                (this.state.books && this.state.books.length > 0) ?
                  this.state.books.map(book => <li key={book.id}><BookCard book={book} shelf={this.handleShelfChange} /></li>) :
                  <p >No results found. Please refine your search</p>
              }
            </ol>
          </div>
        </LoadingOverlay>
      </div>
    )
  }
}

export default SearchBooks;