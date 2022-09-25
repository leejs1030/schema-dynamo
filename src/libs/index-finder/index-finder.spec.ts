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
    it('checkPrimaryKey', () => {
      expect(indexFinder.isPrimaryKey(['hash', 'range'], ['str', 1])).toBeTruthy();
    });
  });
});
