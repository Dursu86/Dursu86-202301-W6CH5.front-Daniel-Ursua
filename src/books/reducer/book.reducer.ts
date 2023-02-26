import { createReducer } from "@reduxjs/toolkit";
import { BookStructure } from "../models/book";
import * as ac from "./book.actions.creator";

export type State = {
  books: BookStructure[];
};

const initialState: State = {
  books: [],
};

export const bookReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (state, { payload }) => {
    return { ...state, books: payload };
  });
  builder.addCase(ac.addCreator, (state, { payload }) => {
    return { ...state, books: [...state.books, payload] };
  });
  builder.addCase(ac.updateCreator, (state, { payload }) => {
    return {
      ...state,
      books: state.books.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      ),
    };
  });
  builder.addCase(ac.deleteCreator, (state, { payload }) => {
    return {
      ...state,
      books: state.books.filter((item) => item.id !== payload),
    };
  });
  builder.addDefaultCase((state) => state);
});
