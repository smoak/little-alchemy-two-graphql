import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync<DatabaseSchema>('db.json');
const db = low(adapter);

interface DatabaseSchema {
  readonly items: DatabaseItems;
}

export interface DatabaseItem {
  readonly myths: boolean;
  readonly makes: Record<string, string>;
}

type DatabaseItems = Record<string, DatabaseItem>;

type GetItems = () => DatabaseItems;
export const getItems: GetItems = () => db.get('items').value();

//   return Object.keys(rawItems).map<DatabaseItem>(itemName => ({
//     name: itemName,
//     myths: rawItems[itemName].myths,
//     makes: rawItems[itemName].makes,
//   }));
// };

type GetItemByName = (name: string) => DatabaseItem;
export const getItemByName: GetItemByName = name => db.get('items').value()[name];

//   return {
//     name,
//     ...rawItems[name],
//   };
// };
