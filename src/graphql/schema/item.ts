import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  Thunk,
} from 'graphql';
import { connectionArgs, connectionDefinitions, globalIdField } from 'graphql-relay';

import { Item, ItemCombination } from '../../data/repos/item';
import {
  itemCombinationConnectionResolver,
  itemCreationConnectionResolver,
  sourceItemCombinationResolver,
  targetItemCombinationResolver,
} from '../resolvers';

import { nodeInterface } from './node';

interface ItemFields extends GraphQLFieldConfigMap<Item, unknown, unknown> {
  readonly name: GraphQLFieldConfig<Item, unknown, unknown>;
  readonly myths: GraphQLFieldConfig<Item, unknown, unknown>;
  readonly id: GraphQLFieldConfig<unknown, unknown, unknown>;
  readonly creates: GraphQLFieldConfig<Item, unknown, unknown>;
  readonly combinations: GraphQLFieldConfig<Item, unknown, unknown>;
  readonly imageUrl: GraphQLFieldConfig<Item, unknown, unknown>;
}

interface ItemCombinationFields extends GraphQLFieldConfigMap<ItemCombination, unknown, unknown> {
  readonly source: GraphQLFieldConfig<ItemCombination, unknown, unknown>;
  readonly target: GraphQLFieldConfig<ItemCombination, unknown, unknown>;
}

const itemCombinationFields: Thunk<ItemCombinationFields> = () => ({
  source: { type: new GraphQLNonNull(ItemType), resolve: sourceItemCombinationResolver },
  target: { type: new GraphQLNonNull(ItemType), resolve: targetItemCombinationResolver },
});

export const ItemCombinationType = new GraphQLObjectType<ItemCombination, unknown, unknown>({
  name: 'ItemCombination',
  description: 'A combination of two items',
  fields: itemCombinationFields,
});

const { connectionType: ItemCombinationConnection } = connectionDefinitions({
  nodeType: ItemCombinationType,
});

type Fields = () => ItemFields;
const fields: Fields = () => ({
  name: { type: new GraphQLNonNull(GraphQLString) },
  myths: { type: new GraphQLNonNull(GraphQLBoolean) },
  id: globalIdField('Item', obj => obj.name),
  imageUrl: { type: new GraphQLNonNull(GraphQLString) },
  creates: {
    description: 'The items that this item creates',
    type: new GraphQLNonNull(ItemCombinationConnection),
    args: connectionArgs,
    resolve: itemCreationConnectionResolver,
  },
  combinations: {
    description: 'The items that create this item',
    type: new GraphQLNonNull(ItemCombinationConnection),
    args: connectionArgs,
    resolve: itemCombinationConnectionResolver,
  },
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

export const { connectionType: ItemConnection } = connectionDefinitions({
  nodeType: ItemType,
});
