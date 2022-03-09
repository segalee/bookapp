import { useEffect } from 'react';
import { connect } from 'react-redux';
import { WishListControllers } from '../cmps/WishListControllers.jsx'
import { removeBookFromWishlist } from '../store/book.action.js'
export const _Wishlist = ({ wishlist, removeBookFromWishlist, currSortBy }) => {
    const sortedWishlist = wishlist.sort((a, b) => a[currSortBy] > b[currSortBy] ? 1 : -1)
    console.log('sortedWishlist:', sortedWishlist);

    return <section>
        <WishListControllers />
        {!!wishlist.length && sortedWishlist.map((book, idx) => {
            return <div key={idx} className='wishlist flex justify-between' >
                <div></div>
                <p>{book.title}</p>
                <button onClick={() => removeBookFromWishlist(book.title)}>x</button>
            </div>
        })}

        {!!wishlist.length && <p className='total'>Total: ${Math.round(wishlist.reduce(function (acc, obj) {
            return acc + +obj.price
        }, 0))}</p>}
    </section>
}

function mapStateToProps({ bookModule }) {
    return {
        wishlist: bookModule.wishlist,
        currSortBy: bookModule.currSortBy,
    };
}
const mapDispatchToProps = {
    removeBookFromWishlist
};

export const Wishlist = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Wishlist);

