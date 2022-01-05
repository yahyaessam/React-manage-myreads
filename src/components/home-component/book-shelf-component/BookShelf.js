import React, { Component } from 'react';
import BookCard from './book-card-component/BookCard';

class BookShelf extends Component {

    handleShelfChange = () => {
        this.props.refresh();
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.map(book => {
                                return (
                                    <li key={book.id}>
                                        <BookCard book={book} shelf={this.handleShelfChange} />
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