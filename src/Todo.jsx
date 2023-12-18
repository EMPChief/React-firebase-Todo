import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={`flex justify-between items-center p-2 ${todo.completed ? 'bg-blue-400' : 'bg-blue-200'} my-2 capitalize`}>
      <div className="flex">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={`ml-2 cursor-pointer ${todo.completed ? 'line-through' : ''}`}
        >
          {todo.text}
        </p>
      </div>
      <button className="flex cursor-pointer item-center" onClick={() => deleteTodo(todo.id)}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todo;
