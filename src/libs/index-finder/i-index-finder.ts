export interface IIndexFinder {
  isPrimaryKey(keys: string[], values: Array<string | number | Buffer>): boolean;

  isIndex(keys: string[], values: Array<string | number | Buffer>): number;

  findPossibleIndex(keys: string[], values: Array<string | number | Buffer>): string[];
}
