import Fuse from 'fuse.js';

import { DatabaseItem, getItemByName, getItemNames, getItems } from '../fetchers/item';

export interface Item {
  readonly name: string;
  readonly myths: boolean;
  readonly creates: ItemCombination[];
  readonly combinations: ItemCombination[];
  readonly imageUrl: string;
}

export interface ItemCombination {
  readonly source: string;
  readonly target: string;
}

const fromCombinations = (combinations: DatabaseItem['combinations']): ItemCombination[] =>
  combinations.map(combo => ({ source: combo[0], target: combo[1] }));

const fromItemWithName = (name: string, item: DatabaseItem): Item => ({
  name,
  imageUrl: item.image_url,
  myths: item.myths,
  creates: item.makes,
  combinations: fromCombinations(item.combinations),
});

type FindById = (id: string) => Item;
export const findById: FindById = id => {
  const item = getItemByName(id);

  if (!item) {
    throw new Error(`Could not find item with id: ${id}`);
  }

  return fromItemWithName(id, item);
};

type FindAll = () => Item[];
export const findAll: FindAll = () => {
  const items = getItems();

  return Object.keys(items).map<Item>(itemName => {
    const item = items[itemName];
    return fromItemWithName(itemName, item);
  });
};

type Search = (query: string) => Item[];
export const search: Search = query => {
  const items = getItemNames();
  const options: Fuse.IFuseOptions<string> = {
    minMatchCharLength: 2,
    threshold: 1,
  };
  const fuse = new Fuse(items, options);
  const results = fuse.search(query);
  return results.map(result => findById(result.item));
};
