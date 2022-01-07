import React, { Component } from 'react';
import BookCard from './book-card-component/BookCard';
import './BookShelf.css';
class BookShelf extends Component {

    handleShelfChange = () => {
        this.props.refresh();
    }
    handleSelectBook = (e) => {
        this.props.selectBook(e);
    }
    render() {
        return (
            <div className="bookshelf" id={(this.props.title).replace(/\s+/g, '')}>
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.map(book => {
                                return (
                                    <li key={book.id}>
                                        <BookCard book={book} shelf={this.handleShelfChange} selectBook={(e) =>this.handleSelectBook(e)} />
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;