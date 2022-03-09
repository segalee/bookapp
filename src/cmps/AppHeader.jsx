import { NavLink } from "react-router-dom";

export function AppHeader() {
    return <section> <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/books'>Books</NavLink>
    </nav></section>

}