// TodoList.jsx

const { Outlet, Link, useNavigate } = ReactRouterDOM

import { TodoPreview } from './TodoPreview.jsx'

export function TodoList({ todos, onRemoveTodo, onUpdateTodo }) {

    const navigate = useNavigate()

    return (
        <section className="todo-list">
            {todos.map(todo => (
                <article className="todo-preview" key={todo._id}>
                    <TodoPreview todo={todo} onUpdateTodo={onUpdateTodo} />
                    <div className="flex space-between">
                        <button className="btn" onClick={() => navigate('/todo/edit/' + todo._id)}>Edit</button>
                        <button className="btn" onClick={() => onRemoveTodo(todo._id)}>Delete</button>
                        <Link to={`/todo/${todo._id}`} className="btn">
                            <button type="button">Details</button>
                        </Link>
                    </div>
                </article>
            ))}
        </section>
    )
}