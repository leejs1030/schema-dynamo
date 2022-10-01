import { DynamoIndex, PrimaryKey } from '../../typing/typing';

export interface IIndexFinder {
  isPrimaryKey(keys: string[], values: Array<string | number | Buffer>): boolean;

  getMatchingScore(
    keys: string[],
    values: Array<string | number | Buffer>,
    indexName: string | DynamoIndex | PrimaryKey,
  ): number;

  findPossibleIndex(keys: string[], values: Array<string | number | Buffer>): string[];
}
