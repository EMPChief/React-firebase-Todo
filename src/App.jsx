import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import {
  query,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setinput] = useState("");

  // Reads from the database
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, []);

  // Update database
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  // Create new todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), { text: input, completed: false });
    setinput("");
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="w-screen h-screen p-4 bg-gradient-to-r from-stone-500 to-blue-500">
      <div className="bg-red-500 max-w-[500] mx-auto rounded-md p-4 shadow-xl">
        <h3 className="p-3 mx-auto text-3xl text-center text-green-400">
          To Do App
        </h3>
        <form onSubmit={createTodo} className="flex justify-between" action="">
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="w-full p-2 text-xl text-left border"
            type="text"
            placeholder="Add ToDo"
          />
          <button className="p-4 ml-2 font-bold text-white bg-blue-500 border rounded-md sm:mt-0 hover:bg-blue-700 py">
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {todos.length < 1 ? null : (
          <p className="p-2 text-xl text-center text-green-400">
            You have {todos.length} todos
          </p>
        )}
        <a href="http://bjornmagne.com/">
          {" "}
          <p className="p-2 text-center text-green-600 border bg-stone-300">
            © Bjørn-Magne All rights reserved
          </p>{" "}
        </a>
      </div>
    </div>
  );
};

export default App;
