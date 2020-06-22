import { GraphQLFieldResolver } from 'graphql';

// import { getItemByName, getItems } from '../../data';
import { findAll } from '../../data/repos/item';
import { Query } from '../types';

// interface LazyItemCombination {
//   readonly source: string;
//   readonly target: string;
// }

export const ItemsResolver: GraphQLFieldResolver<Query, unknown, unknown> = (_source, _args, _context, _info) =>
  findAll();
//   const items = getItems();

//   return [items[1]];
// };

// export const ItemCombinationResolver: GraphQLFieldResolver<Item, unknown, unknown> = parent => {
//   const dbItem = getItemByName(parent.name);

//   return Object.keys(dbItem.makes).map<LazyItemCombination>(key => ({
//     source: key,
//     target: dbItem.makes[key],
//   }));
// };

// export const SourceItemCombinationResolver: GraphQLFieldResolver<LazyItemCombination, unknown, unknown> = (
//   parent,
//   _args,
//   _context,
//   _info
// ) => {
//   return getItemByName(parent.source);
// };

// export const TargetItemCombinationResolver: GraphQLFieldResolver<LazyItemCombination, unknown, unknown> = (
//   parent,
//   _args,
//   _context,
//   _info
// ) => getItemByName(parent.target);
