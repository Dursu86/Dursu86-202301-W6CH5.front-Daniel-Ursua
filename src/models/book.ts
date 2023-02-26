/* eslint-disable no-unused-vars */
export type hasId = {
  id: number;
};

export type ProtoBookStructure = {
  name: string;
  author: string;
  prize: string;
  synopsis: string;
};

export type BookStructure = hasId & ProtoBookStructure;
export class ProtoBook implements BookStructure {
  constructor(
    public id: number,
    public name: string,
    public author: string,
    public prize: string,
    public synopsis: string
  ) {}
}
