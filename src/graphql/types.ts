import { Connection, Edge } from 'graphql-relay';

export interface Node {
  readonly id: string;
}

export interface ItemCombination {
  readonly source: Item;
  readonly target: Item;
}

export type ItemCombinationEdge = Edge<ItemCombination>;
export type ItemCombinationConnection = Connection<ItemCombination>;

export interface Item extends Node {
  readonly name: string;
  readonly myths: boolean;
  readonly creates: ItemCombination[];
}

export type ItemEdge = Edge<Item>;
export type ItemConnection = Connection<Item>;

export interface NoSearchResults {
  readonly message: string;
}

export interface ItemSearchResults {
  items: ItemConnection;
}

export interface SearchArgs {
  readonly query: string;
}

export type SearchResults = NoSearchResults | ItemSearchResults;

export interface Query {
  items: ItemConnection;
  node: Node | null;
  item: Item | null;
  search: SearchResults;
}
