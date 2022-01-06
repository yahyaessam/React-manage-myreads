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
                            let rating = [];
                            rating.push(ratingRecord);
                            if (!localStorage.getItem('rating')) {
                                localStorage.setItem('rating', JSON.stringify(rating));
                            } else {
                                let currentRating = JSON.parse(localStorage.getItem('rating'));
                                currentRating.push(ratingRecord);
                                localStorage.setItem('rating', JSON.stringify(currentRating));
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