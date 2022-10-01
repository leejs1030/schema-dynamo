import { DynamoIndex, IndexNameScore, PrimaryKey } from '../../typing/typing';

export interface IIndexFinder {
  isPrimaryKey(keys: string[], values: Array<string | number | Buffer>): boolean;

  getIndexMatchingScore(
    keys: string[],
    values: Array<string | number | Buffer>,
    indexName?: string | DynamoIndex | PrimaryKey,
  ): number;

  findPossibleIndexList(keys: string[], values: Array<string | number | Buffer>): IndexNameScore[];
}
