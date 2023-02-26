import { createAction } from "@reduxjs/toolkit";
import { BookStructure } from "../models/book";
import { booksActions } from "./books.actions.types";

export const loadCreator = createAction<BookStructure[]>(booksActions.load);

export const addCreator = createAction<BookStructure>(booksActions.add);

export const updateCreator = createAction<BookStructure>(booksActions.update);

export const deleteCreator = createAction<BookStructure["id"]>(
  booksActions.delete
);
