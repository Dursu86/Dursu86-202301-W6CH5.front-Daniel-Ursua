import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "../books/reducer/book.reducer";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
