import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  Thunk,
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { Item, ItemCombination } from '../../data/repos/item';
import { SourceItemCombinationResolver, TargetItemCombinationResolver } from '../resolvers';

import { nodeInterface } from './node';

interface ItemFields extends GraphQLFieldConfigMap<Item, unknown, unknown> {
  readonly name: GraphQLFieldConfig<Item, unknown, unknown>;
  readonly myths: GraphQLFieldConfig<Item, unknown, unknown>;
  readonly id: GraphQLFieldConfig<unknown, unknown, unknown>;
  readonly creates: GraphQLFieldConfig<Item, unknown, unknown>;
  readonly combinations: GraphQLFieldConfig<Item, unknown, unknown>;
}

interface ItemCombinationFields extends GraphQLFieldConfigMap<ItemCombination, unknown, unknown> {
  readonly source: GraphQLFieldConfig<ItemCombination, unknown, unknown>;
  readonly target: GraphQLFieldConfig<ItemCombination, unknown, unknown>;
}

type Fields = () => ItemFields;
const fields: Fields = () => ({
  name: { type: new GraphQLNonNull(GraphQLString) },
  myths: { type: new GraphQLNonNull(GraphQLBoolean) },
  id: globalIdField('Item', obj => obj.name),
  creates: {
    description: 'The items that this item creates',
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemCombinationType))),
  },
  combinations: {
    description: 'The items that create this item',
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemCombinationType))),
  },
});

const itemCombinationFields: Thunk<ItemCombinationFields> = () => ({
  source: { type: new GraphQLNonNull(ItemType), resolve: SourceItemCombinationResolver },
  target: { type: new GraphQLNonNull(ItemType), resolve: TargetItemCombinationResolver },
});

export const ItemType = new GraphQLObjectType<Item, unknown, unknown>({
  name: 'Item',
  description: 'An item',
  interfaces: [nodeInterface],
  fields,
  isTypeOf: source =>
    Object.keys(source).includes('name') &&
    Object.keys(source).includes('myths') &&
    Object.keys(source).includes('creates'),
});

export const ItemCombinationType = new GraphQLObjectType<ItemCombination, unknown, unknown>({
  name: 'ItemCombination',
  description: 'A combination of two items',
  fields: itemCombinationFields,
});
