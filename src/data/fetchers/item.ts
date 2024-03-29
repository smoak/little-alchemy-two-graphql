import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync<DatabaseSchema>('db.json');
const db = low(adapter);

interface DatabaseSchema {
  readonly items: DatabaseItems;
}

export interface DatabaseItem {
  readonly myths: boolean;
  readonly makes: { source: string; target: string }[];
  readonly combinations: string[][];
  readonly image_url: string;
}

type DatabaseItems = Record<string, DatabaseItem>;

type GetItems = () => DatabaseItems;
export const getItems: GetItems = () => db.get('items').value();

type GetItemByName = (name: string) => DatabaseItem | undefined;
export const getItemByName: GetItemByName = name => getItems()[name];

type GetItemNames = () => string[];
export const getItemNames: GetItemNames = () => db.get('items').keys().value();
