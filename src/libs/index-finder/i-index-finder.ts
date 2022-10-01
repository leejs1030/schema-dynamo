import { DynamoIndex, IndexScore, PrimaryKey } from '../../typing/typing';

export interface IIndexFinder {
  isPrimaryKey(keys: string[], values: Array<string | number | Buffer>): boolean;

  getIndexMatchingScore(
    keys: string[],
    values: Array<string | number | Buffer>,
    indexName?: string | DynamoIndex | PrimaryKey,
  ): number;

  findPossibleIndexList(keys: string[], values: Array<string | number | Buffer>): IndexScore[];

  getIndexByName(name?: string | DynamoIndex | PrimaryKey): PrimaryKey | DynamoIndex;
}
