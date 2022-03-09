import { BooksList } from '../cmps/BooksList.jsx'
import { Wishlist } from '../cmps/Wishlist.jsx'

export const Books = () => {
    return <section className='book-page flex justify-between'>
        <div className='flex column'>

            <BooksList />
            <p className='instructions'>Add to favorites by clicking the checkbox!</p>
        </div>
        <Wishlist />
    </section>
}