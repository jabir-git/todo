import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [inputDefault, setInputDefault] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const handleTodoInput = (e) => {
    setInputDefault(e.target.value);
  };

  const handleTodoAdd = () => {
    if (inputDefault.trim() === "") {
      setError("Todo cannot be empty");
      return;
    }
    const newTodo = {
      id: Date.now(),
      todo: inputDefault.trim(),
      done: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputDefault("");
    setError("");
  };

  const handleTodoDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleTodoState = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-stone-200 shadow-lg rounded-lg p-6 w-[80vw] h-[80vh]">
        <div className="flex flex-col mb-4 gap-2 sm:flex-row">
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter a to do"
            value={inputDefault}
            onChange={handleTodoInput}
            className="border rounded p-2 w-full focus:outline-none sm:w-[80%]"
          />
          <button
            onClick={handleTodoAdd}
            className="bg-lime-700 text-white rounded p-2 w-full hover:bg-lime-800 cursor-pointer transition-colors
            sm:w-[20%]"
          >
            Add
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <ul className="list-none p-0 h-[80%] overflow-y-scroll">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="mb-2 flex items-center justify-between bg-gray-50 m-1 p-2 rounded shadow-sm"
            >
              <span
                className={`flex-1 break-words w-[40%] whitespace-pre-wrap ${
                  todo.done ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {todo.todo}
              </span>
              <div className="flex flex-col gap-2 m-1 sm:flex-row">
                <button
                  onClick={() => handleTodoState(todo.id)}
                  className="bg-blue-400 text-white rounded p-2 hover:bg-blue-600 cursor-pointer transition-colors"
                >
                  {todo.done ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => handleTodoDelete(todo.id)}
                  className="bg-red-400 text-white rounded p-2 hover:bg-red-600 cursor-pointer transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
