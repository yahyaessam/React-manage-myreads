import React from "react";
import Rating from '@material-ui/lab/Rating';

function BookRating(props) {
    const [value, setValue] = React.useState(0);
    // const [hover, setHover] = React.useState(-1);
    return (
        <Rating
            value={value}
            precision={0.5}
            max={5}
            name={`unique-rating ${props.bookId}`}
            onChange={(event, newValue) => {
                console.log(1)
                setValue(newValue);
            }}
            // onChangeActive={(event, newHover) => {
            //     setHover(newHover);
            // }}

        />
    )
}
export default BookRating;