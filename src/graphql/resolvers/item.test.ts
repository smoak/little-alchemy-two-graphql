jest.mock('../../data/repos/item');

import { ConnectionArguments } from 'graphql-relay';

import { Item, ItemCombination, findAll, findById } from '../../data/repos/item';
import { Query } from '../types';

import {
  itemCombinationConnectionResolver,
  itemConnectionResolver,
  itemCreationConnectionResolver,
  itemWithNameResolver,
  itemsResolver,
  sourceItemCombinationResolver,
  targetItemCombinationResolver,
} from './item';

describe('item', () => {
  const items: Item[] = [
    { combinations: [], creates: [], myths: false, name: 'test-item', imageUrl: 'https://picsum.photos/48' },
  ];
  const itemCombination: ItemCombination = {
    source: 'source-item',
    target: 'target-item',
  };
  const query: Query = {
    items: {
      pageInfo: {},
      edges: [],
    },
    node: null,
    item: null,
    search: {
      items: {
        pageInfo: {},
        edges: [],
      },
    },
  };

  beforeEach(() => {
    (findAll as jest.Mock).mockReturnValue(items);
    (findById as jest.Mock).mockReturnValue(items[0]);
  });

  describe('.itemsResolver', () => {
    let result: ReturnType<typeof itemsResolver>;

    beforeEach(() => {
      result = itemsResolver();
    });

    it('returns the expected items', () => {
      expect(result).toBe(items);
    });
  });

  describe('.itemWithNameResolver', () => {
    let result: ReturnType<typeof itemWithNameResolver>;

    beforeEach(() => {
      const args = { name: 'test-item' };

      result = itemWithNameResolver(query, args);
    });

    it('returns the expected item', () => {
      expect(result).toBe(items[0]);
    });
  });

  describe('.sourceItemCombinationResolver', () => {
    let result: ReturnType<typeof sourceItemCombinationResolver>;

    beforeEach(() => {
      result = sourceItemCombinationResolver(itemCombination);
    });

    it('returns the expected item', () => {
      expect(result).toBe(items[0]);
    });
  });

  describe('.targetItemCombinationResolver', () => {
    let result: ReturnType<typeof targetItemCombinationResolver>;

    beforeEach(() => {
      result = targetItemCombinationResolver(itemCombination);
    });

    it('returns the expected item', () => {
      expect(result).toBe(items[0]);
    });
  });

  describe('.itemCombinationConnectionResolver', () => {
    let result: ReturnType<typeof itemCombinationConnectionResolver>;

    beforeEach(() => {
      const item: Item = {
        name: 'test-item',
        combinations: [itemCombination],
        creates: [itemCombination],
        myths: false,
        imageUrl: 'https://picsum.photos/48',
      };
      const args: ConnectionArguments = {};
      result = itemCombinationConnectionResolver(item, args);
    });

    it('returns the expected result', () => {
      expect(result).toMatchSnapshot();
    });
  });

  describe('.itemCreationConnectionResolver', () => {
    let result: ReturnType<typeof itemCreationConnectionResolver>;

    beforeEach(() => {
      const item: Item = {
        name: 'test-item',
        combinations: [itemCombination],
        creates: [itemCombination],
        myths: false,
        imageUrl: 'https://picsum.photos/48',
      };
      const args: ConnectionArguments = {};

      result = itemCreationConnectionResolver(item, args);
    });

    it('returns the expected result', () => {
      expect(result).toMatchSnapshot();
    });
  });

  describe('.itemConnectionResolver', () => {
    let result: ReturnType<typeof itemConnectionResolver>;

    beforeEach(() => {
      const args: ConnectionArguments = {};

      result = itemConnectionResolver(query, args);
    });

    it('returns the expected result', () => {
      expect(result).toMatchSnapshot();
    });
  });
});
