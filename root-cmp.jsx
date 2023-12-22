// root-cmp.jsx

const { Provider } = ReactRedux
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { CarIndex } from './pages/CarIndex.jsx'
import { store } from './store/store.js'


export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section className="main-layout app">
                        <AppHeader />
                        <main>
                            <Routes>
                                <Route element={<HomePage />} path="/" />
                                <Route element={<AboutUs />} path="/about" />
                                <Route element={<CarIndex />} path="/car" />
                            </Routes>
                        </main>
                        <AppFooter />
                    </section>
                </Router>
            </Provider>
        )
    }
}


