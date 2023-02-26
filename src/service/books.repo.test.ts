import { BookStructure } from "../books/models/book";
import { BooksRepo } from "./books.repo";

const repo = new BooksRepo();

describe("Given the books repo", () => {
  // OK tests

  describe("When create a new instance of the class and call method readAll", () => {
    test("Then it should create the item and return the values fetched", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest
          .fn()
          .mockResolvedValue([{ test: "test" }] as unknown as BookStructure[]),
      });

      expect(repo).toBeInstanceOf(BooksRepo);
      const readAll = await repo.readAll();
      expect(readAll).toEqual([{ test: "test" }]);
    });
  });

  describe("When it calls the method readOne", () => {
    test("Then it should return the value of the one asked", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest
          .fn()
          .mockResolvedValue({
            id: 2,
            test: "test2",
          } as unknown as BookStructure),
      });

      const readOne = await repo.readOne(2);
      expect(readOne).toEqual({ id: 2, test: "test2" });
    });
  });

  describe("When it calls the method update", () => {
    test("Then it should return the updated value", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: 2,
          test: "test3",
        } as unknown as BookStructure),
      });

      const update = await repo.update({
        test: "test3",
      } as unknown as Partial<BookStructure>);
      expect(update).toEqual({ id: 2, test: "test3" });
    });
  });

  describe("When it calls the method create", () => {
    test("Then it should return the value created", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          id: 3,
          test: "test4",
        } as unknown as BookStructure),
      });

      const create = await repo.create({
        test: "test4",
      } as unknown as Partial<BookStructure>);
      expect(create).toEqual({ id: 3, test: "test4" });
    });
  });

  describe("When it calls the method delete", () => {
    test("Then it should call fetch with no return", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn(),
      });

      const mockDelete = await repo.delete(2);
      expect(fetch).toHaveBeenCalled();
      expect(mockDelete).toBe(undefined);
    });
  });

  // Error tests

  describe("When readAll method fails to fetch", () => {
    test("Then it should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const readAll = repo.readAll();
      await expect(readAll).rejects.toThrow();
    });
  });

  describe("When readOne method fails to fetch", () => {
    test("Then it should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const readOne = repo.readOne(1);
      await expect(readOne).rejects.toThrow();
    });
  });

  describe("When update method fails to fetch", () => {
    test("Then it should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const update = repo.update({
        test: "test",
      } as unknown as Partial<BookStructure>);
      await expect(update).rejects.toThrow();
    });
  });

  describe("When create method fails to fetch", () => {
    test("Then it should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const create = repo.create({
        test: "test",
      } as unknown as Partial<BookStructure>);
      await expect(create).rejects.toThrow();
    });
  });

  describe("When delete method fails to fetch", () => {
    test("Then it should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const mockDelete = repo.delete(1);
      await expect(mockDelete).rejects.toThrow();
    });
  });
});
