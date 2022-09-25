export interface IIndexFinder {
  isPrimaryKey(keys: string[], values: Array<string | number | Buffer>): boolean;
}
