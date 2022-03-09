import { HomePage } from './pages/HomePage.jsx'
import { Books } from './pages/Books.jsx'


const routes = [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/books',
        component: <Books />,
    }
]

export default routes;