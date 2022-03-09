import React from 'react'
import { Routes, Route } from 'react-router-dom';
import routes from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'


export class App extends React.Component {

    render() {
        return (
            <div className='app'>
                <AppHeader />
                <main>
                    <Routes>
                        {/* <Route path="/" element={<Home />}></Route> */}
                        {routes.map(route => <Route key={route.path} element={route.component} exact path={route.path} />)}
                    </Routes>
                </main>
            </div>
        )
    }
}

