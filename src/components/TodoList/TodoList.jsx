import React, { useState, useEffect } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css'

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(() => readTodosFromLocalStroage());

  /* Handler functions */

  // When the new Todo is added
  const handleAdd = (todo) => setTodos([...todos, todo]);

  // Check whether the Todo is 'completed' or 'active'
  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  
  // Delete when the user clicks the icon of the trash bin
  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));
  
  // Save the object to localStorage whenever todos changes
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos]);

  //  Assigned filtered variable to get the state from getFilteredItems function
  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function readTodosFromLocalStroage(){
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos): [];
}

// Distiguish data on what to filter
function getFilteredItems(todos, filter) {
  if (filter === 'all') {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
