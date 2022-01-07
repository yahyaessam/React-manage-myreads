import './BookCard.css';
import React, { Component } from 'react';
import * as BooksApi from '../../../../BooksAPI';
import BookRating from './book-rating-component/BookRating';


class BookCard extends Component {
    state = {
        showMenu: false,
        selected: this.props.book.shelf,
        name: this.props.book.id,
        showCheckBox: false,
        bookSelected: false
    }
    constructor(props) {
        super(props);
        this.ref = React.createRef();

    }
    toggleShowMenu = () => {
        this.setState((current) => ({
            showMenu: !current.showMenu
        }))
    }
    selectShelf = (shelf, book) => {
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
    onBookHover = () => {
        this.setState({ showCheckBox: true });
    }
    onBookHoverLeave = () => {
        this.setState({ showCheckBox: false });
    }
    selectBook(e) {
        this.setState({ bookSelected: e.target.checked });
        this.props.selectBook(e.target.checked);
        let currentStorage = JSON.parse(localStorage.getItem('selectedBooks'));
        if (e.target.checked && !currentStorage) {
            let arr = [this.props.book.id];
            localStorage.setItem('selectedBooks', JSON.stringify(arr));
        } else if (e.target.checked && currentStorage) {
            currentStorage.push(this.props.book.id);
            localStorage.setItem('selectedBooks', JSON.stringify(currentStorage));
        } else {
            if (currentStorage) {
                const currentBookIndex = currentStorage.indexOf(this.props.book.id)
                currentStorage.splice(currentBookIndex, 1);
                currentStorage.length > 0 ?
                    localStorage.setItem('selectedBooks', JSON.stringify(currentStorage)) :
                    localStorage.removeItem('selectedBooks')
            }
        }
    }

    render() {
        return (
            <div>
                <div onMouseEnter={this.onBookHover} onMouseLeave={this.onBookHoverLeave} className={`book ${this.state.bookSelected ? 'selected-book' : ''}`}>
                    <div className="book-right">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''} )` }}></div>
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
                            localStorage.getItem('rating') && JSON.parse(localStorage.getItem('rating')).find(book => book.id === this.props.book.id) ?
                                JSON.parse(localStorage.getItem('rating')).find(book => book.id === this.props.book.id).rate : 0
                        } />
                        <label style={{ 'display': this.state.showCheckBox || this.state.bookSelected ? 'inline-block' : 'none' }} className="pure-material-checkbox">
                            <input onChange={(e) => { this.selectBook(e) }} type="checkbox" defaultChecked={
                                (localStorage.getItem('selectedBooks') && JSON.parse(localStorage.getItem('selectedBooks')).find(book => book === this.props.book.id)) ?
                                    true : false
                            } />
                            <span></span>
                        </label>

                    </div>
                </div>

            </div>

        )
    }

}

export default BookCard;