import { Connection, ConnectionArguments, connectionFromArray } from 'graphql-relay';

import { Item, search } from '../../data/repos/item';
import { NoSearchResults, SearchArgs } from '../types';

export interface SearchResultsResolverItemsResults {
  readonly items: Item[];
}
export type SearchResultsResolverResults = NoSearchResults | SearchResultsResolverItemsResults;

type SearchResultsResolver = (parent: unknown, args: SearchArgs) => SearchResultsResolverResults;
export const searchResultsResolver: SearchResultsResolver = (_, { query }) => {
  const searchResults = search(query);

  if (searchResults.length === 0) {
    return {
      message: `No results matched ${query}`,
    };
  }

  return { items: searchResults };
};

type ItemSearchResultsResolver = (
  parent: SearchResultsResolverItemsResults,
  args: ConnectionArguments
) => Connection<Item>;
export const itemSearchResultsResolver: ItemSearchResultsResolver = (parent, args) =>
  connectionFromArray(parent.items, args);
