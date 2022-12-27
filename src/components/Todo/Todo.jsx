import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './Todo.module.css'

export default function Todo({ todo, onUpdate, onDelete }) {
  const { id, text, status } = todo;

  // Check whether the Todo is 'completed' or 'active' from the e.target.checked
  const handleChange = (e) => {
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...todo, status: status });
  };
  // If the user want to delete then, call onDelete(handleDelete) from TodoList
  const handleDelete = () => onDelete(todo);

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type='checkbox'
        id={id}
        checked={status === 'completed'}
        onChange={handleChange}
      />
      <label htmlFor={id} className={styles.text}>{text}</label>
      
      <span className={styles.icon}>
        <button onClick={handleDelete} className={styles.button}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}
