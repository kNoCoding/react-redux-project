// TodoList.jsx

const { Outlet, Link, useNavigate } = ReactRouterDOM

import { TodoPreview } from './TodoPreview.jsx'

export function TodoList() {


    
    return (
        <React.Fragment>

            <h3>The todos will be shown here in a list</h3>

            <TodoPreview />

        </React.Fragment>
    )
}