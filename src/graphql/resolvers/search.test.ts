jest.mock('../../data/repos/item');

import { ConnectionArguments } from 'graphql-relay';

import { Item, search } from '../../data/repos/item';

import { SearchResultsResolverItemsResults, itemSearchResultsResolver, searchResultsResolver } from './search';

describe('search', () => {
  const items: Item[] = [{ name: 'test', myths: false, creates: [], combinations: [] }];

  describe('.searchResultsResolver', () => {
    let result: ReturnType<typeof searchResultsResolver>;

    describe('with no results', () => {
      beforeEach(() => {
        (search as jest.Mock).mockReturnValue([]);

        result = searchResultsResolver({}, { query: 'test' });
      });

      it('returns the expected result', () => {
        expect(result).toMatchSnapshot();
      });
    });

    describe('with results', () => {
      beforeEach(() => {
        (search as jest.Mock).mockReturnValue(items);

        result = searchResultsResolver({}, { query: 'test' });
      });

      it('returns the expected result', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('.itemSearchResultsResolver', () => {
    let result: ReturnType<typeof itemSearchResultsResolver>;

    beforeEach(() => {
      const parent: SearchResultsResolverItemsResults = {
        items,
      };
      const args: ConnectionArguments = {};
      result = itemSearchResultsResolver(parent, args);
    });

    it('returns the expected result', () => {
      expect(result).toMatchSnapshot();
    });
  });
});
