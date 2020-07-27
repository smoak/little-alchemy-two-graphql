import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { itemConnectionResolver, itemWithNameResolver } from '../resolvers';

import { ItemConnection, ItemType } from './item';
import { nodeField } from './node';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    items: {
      description: 'All the items in the game',
      type: new GraphQLNonNull(ItemConnection),
      args: connectionArgs,
      resolve: itemConnectionResolver,
    },
    item: {
      type: ItemType,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: itemWithNameResolver,
    },
    node: nodeField,
  },
});
