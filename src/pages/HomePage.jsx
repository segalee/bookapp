import { NavLink } from 'react-router-dom';
import Book from '../assets/svgs/reader.svg';
export function HomePage() {
    return (
        <div className="home">
            {/* <div> */}

            <h1>Welcome to my bookApp!</h1>
            <p>Choose your favorite books!</p>
            <NavLink to="/books">Start Here!</NavLink>
            <img src={Book} alt=""></img>            {/* </div> */}
        </div >
    )
}