import React, { Component } from 'react';
import * as BookAPI from '../../BooksAPI';
import './BucketComponent.css';
class BucketComponent extends Component {

    moveAll = async (shelf) => {
        let currentSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks'));
        console.log(currentSelectedBooks)
        let requests = currentSelectedBooks.map(BookId => {
            return new Promise((resolve, reject) => {
                BookAPI.updateById(BookId, shelf).then(data => resolve(data));
            })
        })
        Promise.all(requests).finally(() => {
            localStorage.removeItem('selectedBooks');
            this.props.afterMove();
        });

    }
    unselectAll = () => {
        localStorage.removeItem('selectedBooks');
        localStorage.setItem('selectedBooks', JSON.stringify([]))
        this.props.afterMove();
        window.location.reload()
    }
    render() {
        return (
            <div style={{ 'display': this.props.select || (localStorage.getItem('selectedBooks') && JSON.parse(localStorage.getItem('selectedBooks')).length > 0) ? 'block' : 'none' }} className='bucket-container'>
                <p className='move-all'>
                    Move all to:
                </p>
                <div className='btns-container'>
                    <span className='cat-name-button' onClick={() => this.moveAll('currentlyReading')}>Currently Reading</span>
                    <span className='cat-name-button' onClick={() => this.moveAll('wantToRead')}>Want To Read</span>
                    <span className='cat-name-button' onClick={() => this.moveAll('read')}>Read</span>
                </div>
                <span className='remove-all' title="Unselect All" onClick={this.unselectAll}></span>
            </div>
        )
    }
}

export default BucketComponent