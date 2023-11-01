import { createSlice } from "@reduxjs/toolkit";


const todosSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, text: "Cook", completed: false },
    { id: 2, text: "Clean", completed: false },
    // Add more initial todo items as needed
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    editTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      const existingTodo = state.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
        existingTodo.completed = completed;
      }
    },
    deleteTodo: (state, action) => {
      const idToDelete = action.payload;
      return state.filter(todo => todo.id !== idToDelete);
    },

    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todoToToggle = state.find(todo => todo.id === id);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    },
    // Other actions can be added here
  },
});

export const { addTodo, editTodo, deleteTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
