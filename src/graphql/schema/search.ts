import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLUnionType } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import { itemSearchResultsResolver, searchResultsResolver } from '../resolvers/search';
import { SearchArgs } from '../types';

import { ItemConnection } from './item';

export const ItemSearchResultsType = new GraphQLObjectType({
  name: 'ItemSearchResults',
  description: 'Item search results',
  fields: {
    items: {
      description: 'A paginated list of items',
      type: new GraphQLNonNull(ItemConnection),
      args: connectionArgs,
      resolve: itemSearchResultsResolver,
    },
  },
  isTypeOf: source => Object.keys(source).includes('items'),
});

const NoSearchResultsType = new GraphQLObjectType({
  name: 'NoSearchResults',
  fields: {
    message: {
      description: 'A message indicating why the results could not be found',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  isTypeOf: source => Object.keys(source).includes('message'),
});

const SearchResultsType = new GraphQLUnionType({
  name: 'SearchResults',
  types: [NoSearchResultsType, ItemSearchResultsType],
});

export const searchField: GraphQLFieldConfig<unknown, unknown, SearchArgs> = {
  description: 'Search based on input',
  type: new GraphQLNonNull(SearchResultsType),
  args: {
    query: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The query to execute',
    },
  },
  resolve: searchResultsResolver,
};
