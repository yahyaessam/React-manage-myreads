import './BookCard.css';
import React, { Component } from 'react';



class BookCard extends Component {
    state = {
        showMenu: false
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
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <div ref={this.ref} className="book-shelf-changer" onClick={this.toggleShowMenu}>
                        {
                            this.state.showMenu ? (
                                <div className='book-menu'>
                                    <p className='move-to-text'>Move to...</p>
                                    <div className='book-menu-item'>Currently Reading</div>
                                    <div className='book-menu-item'>Want to Read</div>
                                    <div className='book-menu-item'>Read</div>
                                    <div className='book-menu-item'>None</div>
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
                <div className="book-title">{this.props.book.title} </div>
                <div className="book-authors">{this.props.book.subtitle}</div>
            </div>

        )
    }

}

export default BookCard;