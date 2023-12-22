// TodoEdit.jsx

const { useState, useEffect } = React
const { useParams, useNavigate, useOutletContext } = ReactRouterDOM

import { todoService } from '../services/todo.service.js'


export function TodoEdit() {

    const { todoId } = useParams()
    const navigate = useNavigate()
    const [todo, setTodo] = useState(todoService.getEmptyTodo())
    const { onUpdateTodo, onAddTodo } = useOutletContext()

    useEffect(() => {
        if (todoId) {
            todoService.getById(todoId).then(todo => {
                setTodo(todo)
            })
        }
    }, [todoId])


    function handleSubmit(e) {
        e.preventDefault()
        if (!todo.txt || !todo.isDone) return
        todoId ? onUpdateTodo(todo) : onAddTodo(todo)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setTodo(prevTodo => ({ ...prevTodo, [name]: value }))
    }


    return (
        <div className="backdrop" onClick={() => navigate('/todo')}>
            <div className="todo-edit" onClick={ev => ev.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h3>{todoId ? 'Edit Todo' : 'Add New Todo'}</h3>
                    <div>
                        <label>Text:</label>
                        <input
                            type="text"
                            name="txt"
                            value={todo.txt}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Task is done? </label>
                        <input
                            type="checkbox"
                            name="isDone"
                            // value={todo.isDone ? true : false}
                            value={todo.isDone}
                            onChange={handleChange}
                        // defaultChecked={todo.isDone ? true : false}
                        />
                    </div>
                    <button className="btn" type="submit">
                        {todoId ? 'Update' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
    )
}