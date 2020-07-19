import { Connection, ConnectionArguments, connectionFromArray } from 'graphql-relay';

import { Item, ItemCombination, findAll, findById } from '../../data/repos/item';
import { Query } from '../types';

type ItemsResolver = () => Item[];
export const itemsResolver: ItemsResolver = () => findAll();

interface ItemWithNameResolverArgs {
  readonly name: string;
}
type ItemWithNameResolver = (source: Query, args: ItemWithNameResolverArgs) => Item;
export const itemWithNameResolver: ItemWithNameResolver = (_source, args) => findById(args.name);

type SourceItemCombinationResolver = (source: ItemCombination) => Item;
export const sourceItemCombinationResolver: SourceItemCombinationResolver = parent => findById(parent.source);

type TargetItemCombinationResolver = (source: ItemCombination) => Item;
export const targetItemCombinationResolver: TargetItemCombinationResolver = parent => findById(parent.target);

type ItemCombinationConnectionResolver = (source: Item, args: ConnectionArguments) => Connection<ItemCombination>;
export const itemCombinationConnectionResolver: ItemCombinationConnectionResolver = (item, args) =>
  connectionFromArray(item.combinations, args);
