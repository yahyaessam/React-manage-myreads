import React from "react";
import './BookRating.css';
function BookRating(props) {
    const rate = props.rate;
    const [rating, setRating] = React.useState(rate);

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= rating ? "on" : "off"}
                        onClick={() => {
                            setRating(index);
                            let ratingRecord = { id: props.bookId, rate: index };
                            if (!localStorage.getItem('rating')) {
                                let rating = [];
                                rating.push(ratingRecord);
                                localStorage.setItem('rating', JSON.stringify(rating));
                            } else {
                                let currentRating = JSON.parse(localStorage.getItem('rating'));
                                let currentBook = currentRating.find(book => book.id === props.bookId)
                                if (!currentBook) {
                                    currentRating.push(ratingRecord);
                                    localStorage.setItem('rating', JSON.stringify(currentRating));
                                } else {
                                    if (currentBook.rate !== ratingRecord.rate) {
                                        currentBook.rate = ratingRecord.rate;
                                        localStorage.setItem('rating', JSON.stringify(currentRating));
                                    } else {
                                        let bookRateIndex = currentRating.indexOf(currentBook);
                                        currentRating.splice(bookRateIndex, 1);
                                        currentRating.length > 0 ?
                                        localStorage.setItem('rating', JSON.stringify(currentRating)):
                                        localStorage.removeItem('rating');
                                        setRating(0);
                                    }
                                }
                            }
                        }}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    )
}
export default BookRating;