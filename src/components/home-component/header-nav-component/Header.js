import React from "react";
import './Header.css';
import { Link } from "react-scroll";

function Header() {
    return (
        <div className="list-books-title">
            <div className="left-side">
                <h1>MyReads</h1>
            </div>

            <div className="right-side">
                <Link
                    activeClass="active"
                    to="CurrentlyReading"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="smooth-link"
                >Currently Reading</Link>

                <Link
                    activeClass="active"
                    to="WanttoRead"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="smooth-link"
                >Want to Read</Link>

                <Link
                    activeClass="active"
                    to="Read"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="smooth-link"
                >Read</Link>
            </div>
        </div>
    )
}

export default Header;
