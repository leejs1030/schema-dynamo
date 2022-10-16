import { DynamoSchemaError } from '../../errors';
import { DynamoIndex, IndexScore, PrimaryKey } from '../../typing/typing';
import { IIndexFinder } from './i-index-finder';

export class IndexFinder implements IIndexFinder {
  private readonly primaryLength: number;
  constructor(
    private readonly primaryKey: PrimaryKey,
    private readonly globalIndexList?: DynamoIndex[],
    private readonly localIndexList?: DynamoIndex[],
  ) {
    this.primaryLength = primaryKey.sortKey.name ? 2 : 1;
  }

  private isAllowedType(input: string | number | Buffer, toBe: string) {
    if (typeof input === 'string') return toBe === 'S';
    if (typeof input === 'number') return toBe === 'N';
    if (input instanceof Buffer) return toBe === 'B';

    return false;
  }

  private isHashKey(keyName: string, keyValue: string | number | Buffer, keySchema: PrimaryKey) {
    return (
      keySchema.hashKey.name === keyName && this.isAllowedType(keyValue, keySchema.hashKey.dataType)
    );
  }

  private isSortKey(keyName: string, keyValue: string | number | Buffer, keySchema: PrimaryKey) {
    return (
      keySchema.sortKey?.name === keyName &&
      this.isAllowedType(keyValue, keySchema.sortKey.dataType)
    );
  }

  isPrimaryKey(keys: string[], values: Array<string | number | Buffer>) {
    if (keys.length !== this.primaryLength || keys.length !== values.length)
      throw new DynamoSchemaError('key length miss match!');
    let sortKey = this.primaryLength === 1;
    let hashKey = false;

    if (this.isHashKey(keys[0], values[0], this.primaryKey)) hashKey = true;
    else if (!sortKey && this.isSortKey(keys[0], values[0], this.primaryKey)) sortKey = true;

    if (!hashKey && this.isHashKey(keys[1], keys[1], this.primaryKey)) hashKey = true;
    else if (!sortKey && this.isSortKey(keys[1], values[1], this.primaryKey)) sortKey = true;

    return sortKey && hashKey;
  }

  private getIndexNameScore(
    keys: string[],
    values: Array<string | number | Buffer>,
    indices: DynamoIndex[],
  ): IndexScore[] {
    return indices.map((val) => ({
      ...val,
      score: this.getIndexMatchingScore(keys, values, val),
    }));
  }

  private filterByScore(scores: IndexScore[]) {
    return scores.filter(({ score }) => score > 1);
  }

  findPossibleIndexList(keys: string[], values: Array<string | number | Buffer>): IndexScore[] {
    if (keys.length !== values.length) throw new DynamoSchemaError('key length miss match!');
    const globalScores = this.getIndexNameScore(keys, values, this.globalIndexList);
    const localScores = this.getIndexNameScore(keys, values, this.localIndexList);

    const possibleGlobal = this.filterByScore(globalScores);
    const possibleLocal = this.filterByScore(localScores);

    return [...possibleLocal, ...possibleGlobal];
  }

  getIndexByName(name?: string | DynamoIndex | PrimaryKey): PrimaryKey | DynamoIndex {
    if (!name) return this.primaryKey;
    if (typeof name !== 'string') return name;
    const global = this.globalIndexList.filter(({ indexName }) => indexName === name);
    if (global.length) return global[0];
    const local = this.localIndexList.filter(({ indexName }) => indexName === name);
    if (local.length) return local[0];
    return null;
  }

  private getScoreFromIndex(
    keys: string[],
    values: Array<string | number | Buffer>,
    index: PrimaryKey,
  ) {
    return keys.reduce((acc, cur, idx) => {
      const isHash = this.isHashKey(cur, values[idx], index) as any as number;
      const isSort = this.isSortKey(cur, values[idx], index) as any as number;
      acc = acc ^ (isHash << 1) ^ isSort;
      return acc > 1 ? acc : 0;
    }, 0);
  }

  /**
   *
   * @param keys
   * @param values
   * @param indexName
   *
   * @return number
   * 0 if no matching
   * 1 if sort key matching
   * 2 if hash key matching
   * 3 if hash key + sort key matching
   */
  getIndexMatchingScore(
    keys: string[],
    values: Array<string | number | Buffer>,
    indexName?: string | DynamoIndex | PrimaryKey,
  ): number {
    if (keys.length !== values.length) throw new DynamoSchemaError('key length miss match!');

    const index = this.getIndexByName(indexName);
    if (!index) return 0;

    return this.getScoreFromIndex(keys, values, index);
  }
}
