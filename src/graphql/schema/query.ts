import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { ItemWithNameResolver, ItemsResolver } from '../resolvers';

import { ItemType } from './item';
import { nodeField } from './node';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemType))), resolve: ItemsResolver },
    item: {
      type: ItemType,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: ItemWithNameResolver,
    },
    node: nodeField,
  },
});
