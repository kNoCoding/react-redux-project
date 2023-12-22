// TodoPreview.jsx

export function TodoPreview() {

    return (
        <div className="single-todo flex align-center justify-center" >
            <input type="checkbox" name="toggle-todo" id="toggle-todo" />
            <pre>Todo text will be here dynamically</pre>
        </div>
    )
}