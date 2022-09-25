export interface IIndexFinder {
  isPrimaryKey(keys: string[], values: Array<string | number | Buffer>): boolean;

  getMatchingLength(
    keys: string[],
    values: Array<string | number | Buffer>,
    indexName?: string,
  ): number;

  findPossibleIndex(keys: string[], values: Array<string | number | Buffer>): string[];
}
