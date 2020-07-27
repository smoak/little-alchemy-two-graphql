jest.mock('../fetchers/item');

import { DatabaseItem, getItemByName, getItems } from '../fetchers/item';

import { findAll, findById } from './item';

describe('item', () => {
  const item: DatabaseItem = {
    combinations: [['item1', 'item2']],
    makes: {
      item1: 'item2',
    },
    myths: false,
  };

  describe('.findById', () => {
    let result: ReturnType<typeof findById>;

    describe('when the item cannot be found', () => {
      beforeEach(() => {
        (getItemByName as jest.Mock).mockReturnValue(undefined);

        result = findById('foo');
      });

      it('is `undefined`', () => {
        expect(result).toBeUndefined();
      });
    });

    describe('when the item can be found', () => {
      beforeEach(() => {
        (getItemByName as jest.Mock).mockReturnValue(item);

        result = findById('item');
      });

      it('returns the expected result', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('.findAll', () => {
    let result: ReturnType<typeof findAll>;

    describe('when there are no items', () => {
      beforeEach(() => {
        (getItems as jest.Mock).mockReturnValue([]);

        result = findAll();
      });

      it('retuns the expected result', () => {
        expect(result).toEqual([]);
      });
    });

    describe('when there are items', () => {
      beforeEach(() => {
        const items = {
          ['item']: item,
        };
        (getItems as jest.Mock).mockReturnValue(items);

        result = findAll();
      });

      it('returns the expected result', () => {
        expect(result).toMatchSnapshot();
      });
    });
  });
});
