// TodoPreview.jsx

export function TodoPreview({ todo }) {

    return (
        <section className="todo-preview">
            
            <div className="single-todo" >
                <input type="checkbox" name="toggle-todo" id="toggle-todo" defaultChecked={todo.isDone ? true : false} />
                <p>{todo.txt}</p>
                <small>{todo._id}</small>
            </div>

        </section >

    )
}