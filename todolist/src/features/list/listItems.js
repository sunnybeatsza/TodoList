import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, editTodo, deleteTodo, toggleTodo } from './listSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const List = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [newTodoText, setNewTodoText] = useState('');
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [showEmptyTodoModal, setShowEmptyTodoModal] = useState(false);
  const [todoCount, setTodoCount] = useState(0);

  useEffect(() => {
    setTodoCount(todos.length);
  }, [todos]);

  const handleAdd = () => {
    if (newTodoText.trim() === '') {
      setShowEmptyTodoModal(true); // Display modal for empty todo
    } else {
      dispatch(
        addTodo({
          id: Math.floor(Math.random() * 1000),
          text: newTodoText,
          completed: false,
        })
      );
      setNewTodoText(''); // Clear the input after adding the todo
    }
  };

  const handleEmptyTodoModalClose = () => {
    setShowEmptyTodoModal(false);
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

  const openModal = (id, text) => {
    setEditing(id);
    setEditingText(text);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditing(null);
    setEditingText('');
    setShowModal(false);
  };

  const handleModalSave = () => {
    handleEdit(editing, editingText);
    closeModal();
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
              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>Close</Button>
                  <Button variant="primary" onClick={handleModalSave}>Save changes</Button>
                </Modal.Footer>
              </Modal>
              
            ) : (
              <>
                <span style={{ opacity: todo.completed ? 0.5 : 1 }}>
                  {todo.text}
                </span>
                <button onClick={() => openModal(todo.id, todo.text)}>Edit</button>
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
      <Modal show={showEmptyTodoModal} onHide={handleEmptyTodoModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Empty Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter a valid todo before adding!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEmptyTodoModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <h2>Total Todos: {todoCount}</h2>
    </div>
  );
};

export default List;
