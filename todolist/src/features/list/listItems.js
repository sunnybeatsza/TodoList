import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, editTodo, deleteTodo, toggleTodo } from './listSlice';

const List = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [newTodoText, setNewTodoText] = useState('');

  const handleAdd = () => {
    dispatch(addTodo({
      id: Math.floor(Math.random() * 1000),
      text: newTodoText,
      completed: false
    }));
    setNewTodoText(''); // Clear the input after adding the todo
  };

  const handleEdit = (id, newText) => {
    dispatch(editTodo({ id, text: newText, completed: false }));
    setEditing(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo({ id }));
  };

  const handleNewTodoChange = (e) => {
    setNewTodoText(e.target.value);
  };

  const handleNewTodoKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTodoText}
        onChange={handleNewTodoChange}
        onKeyDown={handleNewTodoKeyDown}
        placeholder="Enter new todo..."
      />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>
            {editing === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEdit(todo.id, editingText);
                  }
                }}
              />
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => setEditing(todo.id)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
