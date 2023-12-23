// TodoPreview.jsx

export function TodoPreview({ todo, onUpdateTodo }) {

    const handleCheckboxChange = () => {
        const updatedTodo = { ...todo, isDone: !todo.isDone }
        onUpdateTodo(updatedTodo)
    }

    return (
        <section className="todo-preview">

            <div className="single-todo" >
                <input
                    type="checkbox"
                    name="toggle-todo"
                    id="toggle-todo"
                    checked={todo.isDone}  // Controlled component
                    onChange={handleCheckboxChange}  // Handle changes

                />
                <p>{todo.txt}</p>
                <p>Owner: {todo.owner.fullname}</p>
                <small>ID: {todo._id}</small>
            </div>

        </section >

    )
}