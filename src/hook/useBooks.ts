import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { BooksRepo } from "../service/books.repo";
import * as ac from "../../src/books/reducer/book.actions.creator";
import { BookStructure } from "../books/models/book";

export function useScrubs(repo: BooksRepo) {
  const books = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const readAllBooks = async () => {
      try {
        const data = await repo.readAll();
        dispatch(ac.loadCreator(data));
      } catch (error) {
        console.error("Error");
      }
    };

    readAllBooks();
  }, [dispatch, repo]);

  const viewBook = async (id: number) => {
    try {
      const data = await repo.readOne(id);
      dispatch(ac.loadOneCreator(data));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const addBook = async (info: BookStructure) => {
    try {
      const data = await repo.create(info);
      dispatch(ac.addCreator(data));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const updateScrub = async (info: Partial<BookStructure>) => {
    try {
      const data = await repo.update(info);
      dispatch(ac.updateCreator(data));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await repo.delete(id);
      dispatch(ac.deleteCreator(id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    books,
    viewBook,
    addBook,
    updateScrub,
    deleteBook,
  };
}
