import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Link } from 'react-router-dom';
import BookShelf from './book-shelf/BookShelf';
import Header from './header-nav/Header';
import * as BooksAPI from '../../BooksAPI';
import './Home.css';
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
            this.setState((prevState) => {
                if (JSON.stringify(prevState.books) === JSON.stringify(books)) {
                    return {books: []}
                }
            })
            // this.setState({books: []})
            setTimeout(() => {
                this.setState(() => {
                    return (
                        { books: books })
                })
                localStorage.setItem('books', JSON.stringify(books));
            }, 0)
        })
    }
    componentDidMount = () => {
        this.getAllBooks();
    }
    handleRefresh = () => {
        this.getAllBooks()
    }
    handleSelectBook = (e) => {
        this.props.selectBookEvent(e)
    }
    render() {
        return (
            (
                <LoadingOverlay
                    active={this.state.books.length === 0}
                    spinner
                    text='Loading your content...'
                >
                    <div className="list-books">
                        <Header />
                        <div className="list-books-content">
                            <div>
                                {this.bookShelves.map(shelf => {
                                    return (
                                        this.state.books.length > 0 ?
                                            <BookShelf key={shelf.id} title={shelf.title} books={this.state.books.filter(book => {
                                                return book.shelf === shelf.id
                                            })} refresh={this.handleRefresh} selectBook={this.handleSelectBook} /> : ''
                                    )
                                })}
                            </div>
                        </div>

                        <div className="open-search" title="koko">
                            <Link to="/search">
                                <button>Search a book</button>
                            </Link>
                        </div>
                    </div>

                </LoadingOverlay>
            )
        )
    }
}
export default Home