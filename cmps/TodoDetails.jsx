// TodoDetails.jsx

const { Link, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { todoService } from '../services/todo.service.js'

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()

    useEffect(() => {
        todoService
            .getById(todoId)
            .then(todo => {
                console.log('todo is', todo)
                setTodo(todo)
            })
            .catch(err => {
                console.log('Error is:', err)
            })
    }, [])

    if (!todo) return <div>Loading...</div>

    return (
        todo && (
            <div className="todo-details main-layout">
                <h1>Todo Details 📃</h1>
                <h2>{todo.txt}</h2>
                <p>Task is {todo.isDone ? 'done!' : 'not done yet.'}</p>
                <p>Created at: {todo.createdAt}</p>
                <p>ID: {todo._id}</p>
                <Link to="/todo"><button>Back to List</button></Link>
            </div>
        )
    )
}