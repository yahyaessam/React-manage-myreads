import './BookCard.css';
import React, { Component } from 'react';
import * as BooksApi from '../../../../BooksAPI';
import BookRating from './book-rating-component/BookRating';


class BookCard extends Component {
    state = {
        showMenu: false,
        selected: this.props.book.shelf,
        ratingValue: 0,
        name: this.props.book.id,
        // updateRatingValue:(newValue) => this.setState({ratingValue:newValue})
    }
    constructor(props) {
        super(props);
        this.ref = React.createRef();

    }
    updateRatingValue = (newValue) => {
        this.setState({ratingValue: newValue})
        console.log(this.state.ratingValue)
    }
    setHover(newValue) {
        // console.log('hover', newValue)
        // console.log(this.state.ratingValue)
    }
    toggleShowMenu = () => {
        this.setState((current) => ({
            showMenu: !current.showMenu
        }))
    }
    selectShelf = (shelf, book) => {
        debugger;
        BooksApi.update(book, shelf).then(data => {
            this.setState({ selected: shelf });
            this.props.shelf();
        });


    }
    onClickOutside() {
        this.setState({ showMenu: false });
    }
    handleClickOutside(event) {
        if (this.ref.current && !this.ref.current.contains(event.target)) {
            this.onClickOutside();
        }
    };
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    };


    render() {
        return (
            <div className="book">
                <div className="book-right">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail: ''} )` }}></div>

                </div>
                <div className='book-left'>
                    <div className="book-title">{this.props.book.title} </div>
                    <div className="book-authors">By: {this.props.book.authors ? this.props.book.authors.map(author => (<span key={author}>{author + ', '}</span>)) : ''}</div>
                    <div ref={this.ref} className="book-shelf-changer" onClick={this.toggleShowMenu}>
                        {
                            this.state.showMenu ? (
                                <div className='book-menu'>
                                    <p className='move-to-text'>Move to...</p>
                                    <div className={`book-menu-item ${this.state.selected === 'currentlyReading' ? 'selected' : ''}`} onClick={(shelf, book) => this.selectShelf('currentlyReading', this.props.book)}>Currently Reading</div>
                                    <div className={`book-menu-item ${this.state.selected === 'wantToRead' ? 'selected' : ''}`} onClick={(shelf, book) => this.selectShelf('wantToRead', this.props.book)}>Want to Read</div>
                                    <div className={`book-menu-item ${this.state.selected === 'read' ? 'selected' : ''}`} onClick={(shelf, book) => this.selectShelf('read', this.props.book)}>Read</div>
                                    <div className={`book-menu-item ${(this.state.selected === 'None' || this.state.selected === undefined) ? 'selected' : ''}`} onClick={(shelf, book) => this.selectShelf('None', this.props.book)}>None</div>
                                </div>
                            ) : ''
                        }
                    </div>
                    <BookRating bookId={this.props.book.id} rate={
                        JSON.parse(localStorage.getItem('rating')).find(book => book.id === this.props.book.id ) ? 
                        JSON.parse(localStorage.getItem('rating')).find(book => book.id === this.props.book.id ).rate: 0
                        } />
                </div>

            </div>

        )
    }

}

export default BookCard;