export interface Node {
  readonly id: string;
}

export interface ItemCombination {
  readonly source: Item;
  readonly target: Item;
}

export interface Item extends Node {
  readonly name: string;
  readonly myths: boolean;
  readonly creates: ItemCombination[];
}

export interface Query {
  readonly items: Item[];
}
