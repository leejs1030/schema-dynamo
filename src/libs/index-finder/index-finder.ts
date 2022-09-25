import { DynamoSchemaError } from '../../errors';
import { DynamoIndex, PrimaryKey } from '../../typing/typing';
import { IIndexFinder } from './i-index-finder';

export class IndexFinder implements IIndexFinder {
  private readonly primaryLength: number;
  constructor(
    private readonly primaryKey: PrimaryKey,
    private readonly globalIndex?: DynamoIndex[],
    private readonly localIndex?: DynamoIndex[],
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
      keySchema.sortKey.name === keyName && this.isAllowedType(keyValue, keySchema.sortKey.dataType)
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
}
