import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import hangmanReducer from '../features/hangman/HangmanSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    hangman: hangmanReducer
  },
});
