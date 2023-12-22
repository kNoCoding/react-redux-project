// TodoIndex.jsx

const { useState, useEffect } = React
const { Outlet, Link, useNavigate } = ReactRouterDOM

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
// add sorting cmp if i still have time and will

import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function TodoIndex() {

    const [todos, setTodos] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        loadTodos()
        // }, [filterBy, sortBy])                                   ++++++++ add it back when the filter and sort are implemented
    }, [])

    function loadTodos() {
        // todoService.query(filterBy, sortBy).then(todos => {      ++++++++ add it back when the filter and sort are implemented
        todoService.query().then(todos => {
            console.log('Todos from DB:', todos)
            setTodos(todos)
        })
    }

    function onRemoveTodo(todoId) {
        todoService
            .remove(todoId)
            .then(() => {
                console.log('Deleted Succesfully!')
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                console.log('from remove todo', err.message)
                showErrorMsg('Cannot remove todo')
            })
    }


    function onAddTodo(todo) {
        todoService
            .save(todo)
            .then(savedTodo => {
                console.log('Added Todo', savedTodo)
                setTodos(prevTodos => [...prevTodos, savedTodo])
                showSuccessMsg('Todo added')
                navigate('/todo')
            })
            .catch(err => {
                console.log('from add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }

    function onUpdateTodo(todo) {
        todoService
            .save(todo)
            .then(savedTodo => {
                console.log('Updated Todo:', savedTodo)
                setTodos(prevTodos =>
                    prevTodos.map(currTodo =>
                        currTodo._id === savedTodo._id ? savedTodo : currTodo
                    )
                )
                showSuccessMsg('Todo updated')
                navigate('/todo')
            })
            .catch(err => {
                console.log('from edit todo', err)
                showErrorMsg('Cannot update todo')
            })
    }

    return (
        <main className='main-layout'>
            <Link to="/todo/edit" className="btn"><button type="button">Add New Task</button></Link>
            <h3>Todos App</h3>
            <TodoFilter />
            <Outlet context={{ onAddTodo, onUpdateTodo }} />
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />

        </main>
    )
}