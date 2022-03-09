import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs"
import { connect } from "react-redux";
import { addBookToWishlist } from '../store/book.action.js'
export const _BookPreview = ({ book, addBookToWishlist }) => {
    const [isChecked, setIsChecked] = useState(false)
    const rate = Math.round(+`${book.rating}`)
    console.log('rate:', rate);
    console.log('props:', addBookToWishlist);
    useEffect(() => {
        isChecked && addBookToWishlist(book.title, book.price, book.rating)
    }, [isChecked])
    useEffect(() => {
        setIsChecked(false)

    }, [book._id])
    return <div className="book-preview flex column">
        <div className="header flex justify-between align-center">
            <h1>{book.title}</h1>
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
        </div>
        <div className="details flex column">
            <h2>{book.author}</h2>
            <p className="book-desc">{book.description}</p>

            <div className="flex align-center book-info"><p>Rating:</p>
                {[...Array(rate)].map((r, idx) => {
                    return <BsStarFill key={idx} color="#969638" />
                })}
                {(rate < 5) &&
                    [...Array(5 - rate)].map((r, idx) => {
                        return <BsStarFill key={idx} />
                    })
                }
            </div>
            <div className="flex align-center book-info">
                <p>Price:</p>
                ${book.price}
            </div>
        </div>
    </div >
}

function mapStateToProps({ bookModule }) {
    return {
    };
}
const mapDispatchToProps = {
    addBookToWishlist
};

export const BookPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BookPreview);

