import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { ItemsResolver } from '../resolvers';

import { ItemType } from './item';
import { nodeField } from './node';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ItemType))), resolve: ItemsResolver },
    node: nodeField,
  },
});
