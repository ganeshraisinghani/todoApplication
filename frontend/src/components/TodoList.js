import { useState, useEffect } from 'react';
import axios from 'axios';

const API = "http://localhost:5000/api/todos";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get(API).then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post(API, { title });
    setTodos([...todos, res.data]);
    setTitle('');
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API}/${id}`, { completed: !completed });
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  const deleteTodo = async id => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
