// TodoIndex.jsx

const { useState, useEffect } = React
const { Outlet, Link, useNavigate } = ReactRouterDOM

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'

export function TodoIndex() {

    return (
        <div>
            <h3>Todos App</h3>
            <TodoFilter />
            <TodoList />
        </div>
    )
}