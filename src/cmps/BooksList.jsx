import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { BookPreview } from './BookPreview.jsx'
import { loadBooks } from '../store/book.action.js'
export const _BooksList = (props) => {
    const [currBook, setCurrBook] = useState(0)
    useEffect(() => {
        props.loadBooks()
        console.log('props:', props);
    }, [])

    return (
        <section>
            <div className="books-list flex align-center">
                {!!props.books[currBook - 1] ? <button className='prev-book' onClick={() => setCurrBook(currBook - 1)}>
                    <BsChevronLeft size="23px" /></button> : <button className='prev-book'></button>}
                {!!props.books[currBook] && <BookPreview book={props.books[currBook]} />}
                {!!props.books[currBook + 1] && <button className='next-book' onClick={() => setCurrBook(currBook + 1)}><BsChevronRight size="23px" /></button>}
            </div>
        </section >
    )
}


function mapStateToProps({ bookModule }) {
    return {
        books: bookModule.books,
    };
}
const mapDispatchToProps = {
    loadBooks
};

export const BooksList = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BooksList);

