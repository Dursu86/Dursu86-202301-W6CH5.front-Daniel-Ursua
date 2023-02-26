import { BookStructure } from "../books/models/book";

export interface BooksRepoStructure {
  readAll(): Promise<BookStructure[]>;
  readOne(id: BookStructure["id"]): Promise<BookStructure>;
  create(info: Partial<BookStructure>): Promise<BookStructure>;
  update(info: Partial<BookStructure>): Promise<BookStructure>;
  delete(id: BookStructure["id"]): Promise<void>;
}

export class BooksRepo implements BooksRepoStructure {
  constructor(public url: string = "http://localhost:4500/books") {}

  async readAll(): Promise<BookStructure[]> {
    const resp = await fetch(this.url);
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);
    const BookStructure = (await resp.json()) as BookStructure[];
    return BookStructure;
  }

  async readOne(id: number): Promise<BookStructure> {
    const url = this.url + "/" + id;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);

    const BookStructure = (await resp.json()) as BookStructure;
    return BookStructure;
  }

  async update(info: Partial<BookStructure>): Promise<BookStructure> {
    const url = this.url + "/" + info.id;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);
    const data = (await resp.json()) as BookStructure;
    return data;
  }

  async create(info: Partial<BookStructure>): Promise<BookStructure> {
    const resp = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);

    const data = (await resp.json()) as BookStructure;
    return data;
  }

  async delete(id: number): Promise<void> {
    const url = this.url + "/" + id;
    const resp = await fetch(url, {
      method: "DELETE",
    });
    if (!resp.ok)
      throw new Error("Error HTTP " + resp.status + ". " + resp.statusText);
  }
}
