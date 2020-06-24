import { DatabaseItem, getItemByName, getItems } from '../fetchers/item';

export interface Item {
  readonly name: string;
  readonly myths: boolean;
  readonly creates: ItemCombination[];
  readonly combinations: ItemCombination[];
}

export interface ItemCombination {
  readonly source: string;
  readonly target: string;
}

const fromMakes = (makes: DatabaseItem['makes']): ItemCombination[] =>
  Object.keys(makes).map(source => ({ source, target: makes[source] }));

const fromCombinations = (combinations: DatabaseItem['combinations']): ItemCombination[] =>
  combinations.map(combo => ({ source: combo[0], target: combo[1] }));

const fromItemWithName = (name: string, item: DatabaseItem): Item => ({
  name,
  myths: item.myths,
  creates: fromMakes(item.makes),
  combinations: fromCombinations(item.combinations),
});

type FindById = (id: string) => Item;
export const findById: FindById = id => {
  const item = getItemByName(id);
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
