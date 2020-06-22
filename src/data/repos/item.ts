import { getItemByName, getItems } from '../fetchers/item';

interface Item {
  readonly name: string;
  readonly myths: boolean;
}
type FindById = (id: string) => Item;
export const findById: FindById = id => {
  const item = getItemByName(id);

  return {
    name: id,
    myths: item.myths,
  };
};

type FindAll = () => Item[];
export const findAll: FindAll = () => {
  const items = getItems();

  return Object.keys(items).map<Item>(itemName => ({
    name: itemName,
    myths: items[itemName].myths,
    // makes: items[itemName].makes,
  }));
};
