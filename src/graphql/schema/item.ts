import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  // Thunk,
} from 'graphql';

// import { SourceItemCombinationResolver, TargetItemCombinationResolver } from '../resolvers';
import { Item } from '../types';

import { IDFetcher, globalIdField, nodeInterface } from './node';

const idFetcher: IDFetcher<Item> = obj => obj.name;

interface ItemFields extends GraphQLFieldConfigMap<unknown, unknown, unknown> {
  readonly name: GraphQLFieldConfig<unknown, unknown, unknown>;
  readonly myths: GraphQLFieldConfig<unknown, unknown, unknown>;
  readonly id: GraphQLFieldConfig<unknown, unknown, unknown>;
  // readonly creates: GraphQLFieldConfig<unknown, unknown, unknown>;
}

// interface ItemCombinationFields extends GraphQLFieldConfigMap<unknown, unknown, unknown> {
//   readonly source: GraphQLFieldConfig<unknown, unknown, unknown>;
//   readonly target: GraphQLFieldConfig<unknown, unknown, unknown>;
// }

type Fields = () => ItemFields;
const fields: Fields = () => ({
  name: { type: new GraphQLNonNull(GraphQLString) },
  myths: { type: new GraphQLNonNull(GraphQLBoolean) },
  id: globalIdField<Item>({ idFetcher }),
  // creates: { type: new GraphQLNonNull(new GraphQLList(ItemCombinationType)), resolve: ItemCombinationResolver },
});

// const itemCombinationFields: Thunk<ItemCombinationFields> = () => ({
//   source: { type: new GraphQLNonNull(ItemType), resolve: SourceItemCombinationResolver },
//   target: { type: new GraphQLNonNull(ItemType), resolve: TargetItemCombinationResolver },
// });

export const ItemType = new GraphQLObjectType<unknown, unknown, unknown>({
  name: 'Item',
  description: 'An item',
  interfaces: [nodeInterface],
  fields,
});

// export const ItemCombinationType = new GraphQLObjectType<unknown, unknown, unknown>({
//   name: 'ItemCombination',
//   description: 'A combination of two items',
//   fields: itemCombinationFields,
// });
