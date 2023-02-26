import { BookStructure } from "../models/book";
import * as ac from "./book.actions.creator";
import { bookReducer, State } from "./book.reducer";

describe("Given the bookReducer", () => {
  const mockLoad = {
    type: ac.loadCreator,
    payload: 1,
  };

  const mockLoadOne = {
    type: ac.loadOneCreator,
    payload: 1,
  };

  const mockAdd = {
    type: ac.addCreator,
    payload: 2,
  };

  const mockDelete = {
    type: ac.deleteCreator,
    payload: 3,
  };

  const mockUpdate = {
    type: ac.updateCreator,
    payload: { id: 3, author: "New author" },
  };

  const mockState: State = { books: [] };

  describe("When action is load", () => {
    test("Then it should return the new state", () => {
      const operation = bookReducer(mockState, mockLoad);
      const result = { books: 1 };
      expect(operation).toEqual(result);
    });
  });

  describe("When action is loadOne", () => {
    test("Then it should return the new state", () => {
      const mockLoadState = {
        books: [{ id: 1, author: "test" }],
      } as unknown as State;
      const operation = bookReducer(mockLoadState, mockLoadOne);
      const result = { books: [{ id: 1, author: "test" }] };

      expect(operation).toEqual(result);
    });
  });

  describe("When action is add", () => {
    test("Then it should return the state with a new item", () => {
      const mockAddState = { books: ["test"] } as unknown as State;
      const operation = bookReducer(mockAddState, mockAdd);
      const result = { books: ["test", 2] };
      expect(operation).toEqual(result);
    });
  });

  describe("When action is upload", () => {
    test("Then it should return the state with the item updated", () => {
      const mockUploadState = {
        books: [{ id: 3, author: "test" }],
      } as unknown as State;
      const operation = bookReducer(mockUploadState, mockUpdate);
      const result = { books: [{ id: 3, author: "New author" }] };
      expect(operation).toEqual(result);
    });
  });

  describe("When action is delete", () => {
    test("Then it should return the state with the item updated", () => {
      const mockDeleteState = {
        books: [{ id: 3, author: "test" }],
      } as unknown as State;
      const operation = bookReducer(mockDeleteState, mockDelete);
      const result = { books: [] };
      expect(operation).toEqual(result);
    });
  });
});
