import React, { Component } from 'react';
import BookCard from './book-card-component/BookCard';

class BookShelf extends Component {
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
                                        <BookCard book={book} />
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