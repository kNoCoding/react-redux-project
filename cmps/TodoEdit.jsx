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
                setTodo({
                    ...todo,
                    isDone: todo.isDone === 'true' // Convert isDone to boolean
                })
            })
        }
    }, [todoId])


    // function handleSubmit(e) {
    //     e.preventDefault()
    //     if (!todo.txt || !todo.isDone) return
    //     todoId ? onUpdateTodo(todo) : onAddTodo(todo)
    // }

    function handleSubmit(e) {
        e.preventDefault();
        const todoToSave = {
            ...todo,
            isDone: !!todo.isDone, // Ensure isDone is a boolean
        };
        todoId ? onUpdateTodo(todoToSave) : onAddTodo(todoToSave);
        navigate('/todo'); // Navigate back to the todo list after saving
    }

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setTodo(prevTodo => ({ ...prevTodo, [name]: value }))
    // }

    function handleChange(e) {
        const { name, type, checked, value } = e.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: type === 'checkbox' ? checked : value, // Properly handle checkbox changes
        }));
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
                            checked={!!todo.isDone} // Use checked for controlled checkbox
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