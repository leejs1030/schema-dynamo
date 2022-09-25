import { IndexFinder } from './index-finder';
import { IIndexFinder } from './i-index-finder';
import { DynamoIndex, PrimaryKey } from '../../typing/typing';

describe('IndexFinder', () => {
  const primaryKey: PrimaryKey = {
    hashKey: { name: 'hash', dataType: 'S' },
    sortKey: { name: 'range', dataType: 'N' },
  };

  const globalIndex: DynamoIndex[] = [
    {
      indexName: 'gsi1',
      hashKey: { name: 'gsi1-hash', dataType: 'S' },
      sortKey: { name: 'gsi1-range', dataType: 'N' },
    },
    {
      indexName: 'gsi2',
      hashKey: { name: 'gsi2-hash', dataType: 'N' },
      sortKey: { name: 'gsi2-range', dataType: 'N' },
    },
    {
      indexName: 'gsi3',
      hashKey: { name: 'gsi3-hash', dataType: 'B' },
    },
  ];
  const localIndex: DynamoIndex[] = [
    {
      indexName: 'lsi1',
      hashKey: { name: 'hash', dataType: 'S' },
      sortKey: { name: 'lsi1-range', dataType: 'N' },
    },
    {
      indexName: 'lsi2',
      hashKey: { name: 'hash', dataType: 'S' },
      sortKey: { name: 'lsi2-range', dataType: 'B' },
    },
  ];
  const indexFinder: IIndexFinder = new IndexFinder(primaryKey, globalIndex, localIndex);

  describe('isPrimaryKey', () => {
    it('to be true', () => {
      expect(indexFinder.isPrimaryKey(['hash', 'range'], ['str', 1])).toBeTruthy();
    });

    it('wrong length', () => {
      expect(() => indexFinder.isPrimaryKey(['hash', 'range', 'a'], ['str', 1, 3])).toThrow();
      expect(() => indexFinder.isPrimaryKey(['hash', 'range'], ['str', 1, 3])).toThrow();
    });

    it('wrong name', () => {
      expect(indexFinder.isPrimaryKey(['hash', 'asdfuihasdfkj'], ['str', 1])).toBeFalsy();
    });

    it('wrong type', () => {
      expect(indexFinder.isPrimaryKey(['hash', 'range'], ['str', new Buffer('a')])).toBeFalsy();
    });
  });

  describe('findPossibleIndex', () => {});

  describe('isIndex', () => {
    it('correct matching local index', () => {
      expect(indexFinder.isIndex(['hash', 'lsi1-range'], ['asdf', 3])).toBe(2);
      expect(indexFinder.isIndex(['hash', 'lsi2-range'], ['asdf', new Buffer(1)])).toBe(1);
    });

    it('correct matching global index', () => {
      expect(indexFinder.isIndex(['gsi1-hash', 'gsi1-range'], ['asdf', 3])).toBe(2);
      expect(indexFinder.isIndex(['gsi2-hash', 'gsi2-range'], [2, 3])).toBe(2);
      expect(indexFinder.isIndex(['gsi3-hash'], [new Buffer(1)])).toBe(1);
    });

    it('correct partial global index', () => {
      expect(indexFinder.isIndex(['gsi1-hash'], ['asdf'])).toBe(1);
      expect(indexFinder.isIndex(['gsi2-hash'], [2])).toBe(1);
    });

    it('correct matching primary key', () => {
      expect(indexFinder.isIndex(['hash', 'range'], ['asdf', 3])).toBe(2);
    });

    it('correct partial primary key', () => {
      expect(indexFinder.isIndex(['hash'], ['asdf'])).toBe(1);
    });

    it('cant match with only range key', () => {
      expect(indexFinder.isIndex(['range'], [3])).toBeFalsy();
    });

    it('length missmatch error', () => {
      expect(() => indexFinder.isIndex(['range'], [3, 4])).toThrow();
    });

    it("can't find index", () => {
      expect(indexFinder.isIndex(['gsi1zz-hash'], ['asdf'])).toBeFalsy();
    });

    it('column except index', () => {
      expect(indexFinder.isIndex(['gsi1-hash', 'gsi1-range', 'strange'], ['asdf', 3, 'asdf'])).toBe(
        2,
      );
      expect(indexFinder.isIndex(['gsi1-hash', 'strange'], ['asdf', 3])).toBe(1);
      expect(indexFinder.isIndex(['gsi1-range', 'strange'], [3, 'asdf'])).toBe(0);
    });
  });
});
