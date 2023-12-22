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
                <p>
                    Done:{' '}
                    <span className={'is-done' + todo.isDone}>{todo.isDone}</span>
                </p>
                <p>
                    Created at: <span>{todo.createdAt}</span>
                </p>
                <Link to="/todo">Back to List</Link>
            </div>
        )
    )
}