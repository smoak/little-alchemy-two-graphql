import { DatabaseItem, getItemByName, getItems } from '../fetchers/item';

export interface Item {
  readonly name: string;
  readonly myths: boolean;
  readonly creates: ItemCombination[];
}

export interface ItemCombination {
  readonly source: string;
  readonly target: string;
}

const withItemCombinations = (item: DatabaseItem): ItemCombination[] =>
  Object.keys(item.makes).map(source => ({ source, target: item.makes[source] }));

type FindById = (id: string) => Item;
export const findById: FindById = id => {
  const item = getItemByName(id);

  return {
    name: id,
    myths: item.myths,
    creates: withItemCombinations(item),
  };
};

type FindAll = () => Item[];
export const findAll: FindAll = () => {
  const items = getItems();

  return Object.keys(items).map<Item>(itemName => ({
    name: itemName,
    myths: items[itemName].myths,
    creates: withItemCombinations(items[itemName]),
  }));
};
