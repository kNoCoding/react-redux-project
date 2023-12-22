// RootCmp.jsx

const { Provider } = ReactRedux
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

// COMPONENTS
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { TodoEdit } from './cmps/TodoEdit.jsx'

// PAGES
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'

import { CarIndex } from './pages/CarIndex.jsx'

import { TodoIndex } from './pages/TodoIndex.jsx'
import { TodoDetails } from './cmps/TodoDetails.jsx'

// STORE
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

                                <Route element={<TodoIndex />} path="/todo" >
                                    <Route element={<TodoEdit />} path="/todo/edit" />
                                    <Route element={<TodoEdit />} path="/todo/edit/:todoId" />
                                </Route>

                                <Route element={<TodoDetails />} path={"/todo/:todoId"} />
                            </Routes>
                        </main>
                        <AppFooter />
                    </section>
                </Router >
            </Provider >
        )
    }
}


