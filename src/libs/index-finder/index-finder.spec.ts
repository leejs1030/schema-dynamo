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

  describe('findPossibleIndex', () => {
    it('find only lsi by pk', () => {
      expect(indexFinder.findPossibleIndexList(['hash'], ['str'])).toStrictEqual([
        { name: 'lsi1', score: 2 },
        { name: 'lsi2', score: 2 },
      ]);
      expect(indexFinder.findPossibleIndexList(['hash', 'range'], ['str', 1])).toStrictEqual([
        { name: 'lsi1', score: 2 },
        { name: 'lsi2', score: 2 },
      ]);
    });

    it('cannot find by only range key', () => {
      expect(indexFinder.findPossibleIndexList(['gsi2-range'], [1])).toStrictEqual([]);
    });

    it('find indices with non-index addition attributes', () => {
      expect(indexFinder.findPossibleIndexList(['gsi1-hash', 'asdf'], ['str', 3])).toStrictEqual([
        { name: 'gsi1', score: 2 },
      ]);
    });

    it('find multiple possible indices', () => {
      const keys = [
        'gsi1-hash',
        'gsi2-hash',
        'hash',
        'lsi1-range',
        'gsi3-hash',
        'gsi1-range',
        'lsi1-range',
      ];
      const values = ['str', 'str', 'a', 'a', new Buffer(1), 3, 7];
      expect(indexFinder.findPossibleIndexList(keys, values)).toStrictEqual([
        { name: 'lsi1', score: 3 },
        { name: 'lsi2', score: 2 },
        { name: 'gsi1', score: 3 },
        { name: 'gsi3', score: 2 },
      ]);
    });

    it('not matching error', () => {
      expect(() => indexFinder.findPossibleIndexList(['a'], [])).toThrow();
    });
  });

  describe('getMatchingScore', () => {
    it('correct matching local index', () => {
      expect(indexFinder.getIndexMatchingScore(['hash', 'lsi1-range'], ['asdf', 3], 'lsi1')).toBe(
        3,
      );
      expect(
        indexFinder.getIndexMatchingScore(['hash', 'lsi2-range'], ['asdf', new Buffer(1)], 'lsi2'),
      ).toBe(3);
    });

    it('correct matching global index', () => {
      expect(
        indexFinder.getIndexMatchingScore(['gsi1-hash', 'gsi1-range'], ['asdf', 3], 'gsi1'),
      ).toBe(3);
      expect(indexFinder.getIndexMatchingScore(['gsi2-hash', 'gsi2-range'], [2, 3], 'gsi2')).toBe(
        3,
      );
      expect(indexFinder.getIndexMatchingScore(['gsi3-hash'], [new Buffer(1)], 'gsi3')).toBe(2);
    });

    it('correct partial global index', () => {
      expect(indexFinder.getIndexMatchingScore(['gsi1-hash'], ['asdf'], 'gsi1')).toBe(2);
      expect(indexFinder.getIndexMatchingScore(['gsi2-hash'], [2], 'gsi2')).toBe(2);
    });

    it('correct matching primary key', () => {
      expect(indexFinder.getIndexMatchingScore(['hash', 'range'], ['asdf', 3])).toBe(3);
    });

    it('correct partial primary key', () => {
      expect(indexFinder.getIndexMatchingScore(['hash'], ['asdf'])).toBe(2);
    });

    it('cant match with only range key', () => {
      expect(indexFinder.getIndexMatchingScore(['range'], [3])).toBe(1);
    });

    it('no matching column for index', () => {
      expect(indexFinder.getIndexMatchingScore(['zz', 'xx'], [2, 3], 'gsi2')).toBe(0);
    });

    it('length missmatch error', () => {
      expect(() => indexFinder.getIndexMatchingScore(['range'], [3, 4])).toThrow();
    });

    it("can't find index", () => {
      expect(indexFinder.getIndexMatchingScore(['gsi1-hash'], ['asdf'], 'strange')).toBe(0);
    });

    it('column except index', () => {
      expect(
        indexFinder.getIndexMatchingScore(
          ['gsi1-hash', 'gsi1-range', 'strange'],
          ['asdf', 3, 'asdf'],
          'gsi1',
        ),
      ).toBe(3);
      expect(indexFinder.getIndexMatchingScore(['gsi1-hash', 'strange'], ['asdf', 3], 'gsi1')).toBe(
        2,
      );
      expect(
        indexFinder.getIndexMatchingScore(['gsi1-range', 'strange'], [3, 'asdf'], 'gsi1'),
      ).toBe(1);
    });
  });
});
