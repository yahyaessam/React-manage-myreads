import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './book-shelf-component/BookShelf';
import Header from './header-nav-component/Header';
import * as BooksAPI from '../../BooksAPI';
class Home extends Component {
    bookShelves = [
        { id: 'currentlyReading', title: 'Currently Reading' },
        { id: 'wantToRead', title: 'Want to Read' },
        { id: 'read', title: 'Read' }
    ]

    state = {
        books: []
    }
    getAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState(() => {
                return (
                    { books: books })
            }
            )
            localStorage.setItem('books', JSON.stringify(books));
        })
    }
    componentDidMount = () => {
        this.getAllBooks();

    }
    handleRefresh = () => {
        this.getAllBooks()
    }
    render() {
        return (
            (
                <div className="list-books">
                    <Header />
                    <div className="list-books-content">
                        <div>
                            {this.bookShelves.map(shelf => {
                                return (
                                    <BookShelf key={shelf.id} title={shelf.title} books={this.state.books.filter(book => {
                                        return book.shelf === shelf.id
                                    })} refresh={this.handleRefresh} />
                                )
                            })}
                        </div>
                    </div>

                    <div className="open-search">
                        <Link to="/search">
                            <button>Search a book</button>
                        </Link>
                    </div>
                </div>
            )
        )
    }
}
export default Home