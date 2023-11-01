import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/list/listSlice'; // Import your todoSlice or any other reducers

const store = configureStore({
  reducer: {
    todos: todosReducer,
    // Add more reducers here if available
  },
});

export default store;
