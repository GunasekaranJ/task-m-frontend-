import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../Todo/Todo.module.css";
import logo from '../Todo/2.png';
import logout from './1.png'
import Todolist from '../Todolist/Todolist';

function Todo() {
  useEffect(() => {
    document.title = "NextMove Task Management";
    fetchTodos(); 
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedStatus, setCompletedStatus] = useState({});


  const API_BASE = "http://localhost:8080/todo";

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Fetch all todos
  const fetchTodos = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/todo/alltodo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setTodos(res.data))
    .catch(err => console.error("Error fetching todos:", err));
  };

  // Add a new todo
  const addTodo = () => {
    if (!title) return;

    const newTodo = { title, description };

    axios.post(`${import.meta.env.VITE_API_URL}/todo/create`, newTodo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setTodos([...todos, res.data]))
    .catch(err => console.error("Error adding todo:", err));

    setTitle("");
    setDescription("");
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    .catch(err => console.error("Error deleting todo:", err));
  };

  const handleToggle = (id, isDone) => {
  const token = localStorage.getItem("token");

  axios.put(`${import.meta.env.VITE_API_URL}/todo/${id}/status`,
    { isdone: isDone },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  ).then(() => fetchTodos());
};



  const totalTask = todos.length;
 const completedTask = Object.values(completedStatus).filter(Boolean).length;
  const inCompleteTask = totalTask - completedTask;


  return (
    <>
      <header  className={styles.head}>
        <div className={styles.namelogo}>
          <img src={logo} alt="" />
          <h1>NextMove</h1>
        </div>

        <div className={styles.logout}>
          <img src={logout} alt=""  onClick={() => {
            localStorage.removeItem("token"); 
            window.location.href = "/";
          }}/>
          <p>Log-out</p>
        </div>
      </header>

      <main>
        <div className={styles.mainContainer}>

          <div className={styles.taskStats}>
            <h3 className={styles.total}>Total: {totalTask}</h3>
            <h3 className={styles.complete}>Completed: {completedTask}</h3>
            <h3 className={styles.incomplete}>Incomplete: {inCompleteTask}</h3>
          </div>


          <div className={styles.inputTodo}>
            <input
              type="text"
              placeholder='Add title for the task'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder='Add your description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </div>

          <div className={styles.AddedTodo}>
            {todos.map((todo) => (
              <Todolist
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                deleteTodo={deleteTodo}
                onToggle={handleToggle}
                checked={todo.isdone}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Todo;
