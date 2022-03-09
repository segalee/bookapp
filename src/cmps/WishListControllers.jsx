import { useState } from "react"
import { connect } from "react-redux"
import { updateSortBy } from '../store/book.action.js'
export const _WishListControllers = ({ updateSortBy }) => {
    const [isClicked, setIsClicked] = useState('Title')

    return (
        <section className="wishlist-controllers">
            <button className={isClicked === 'Title' ? 'clicked' : ''} onClick={() => {
                setIsClicked('Title')
                updateSortBy('title')
            }}>Title</button>
            <button className={isClicked === 'Price' ? 'clicked' : ''} onClick={() => {
                setIsClicked('Price')
                updateSortBy('price')
            }}>Price</button>
            <button className={isClicked === 'Rating' ? 'clicked' : ''} onClick={() => {
                setIsClicked('Rating')
                updateSortBy('rating')
            }}>Rating</button>
        </section>
    )
}



function mapStateToProps({ bookModule }) {
    return {
        currSortBy: bookModule.currSortBy,
    };
}
const mapDispatchToProps = {
    updateSortBy
};

export const WishListControllers = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WishListControllers);

