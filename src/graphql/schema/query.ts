import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { itemWithNameResolver, itemsResolver } from '../resolvers';

import { ItemType } from './item';
import { nodeField } from './node';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemType))), resolve: itemsResolver },
    item: {
      type: ItemType,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: itemWithNameResolver,
    },
    node: nodeField,
  },
});
