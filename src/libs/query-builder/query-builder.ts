import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ParseSchema } from '../../schema/parse/parse-schema';
import { IndexFinder } from '../index-finder/index-finder';
import {
  AllowedKeyTypes,
  DynamoIndex,
  DynamoIndexKeyType,
  IndexScore,
  FindInput,
  Operator,
  PrimaryKey,
} from '../../typing/typing';
import { DynamoSchemaError } from '../../errors';
import { IQueryBuilder } from './i-query-builder';
import { IIndexFinder } from '../index-finder/i-index-finder';

export class QueryBuilder implements IQueryBuilder {
  private readonly indexFinder: IIndexFinder;
  private readonly tableName: string;
  private readonly primaryKey: PrimaryKey;
  private readonly globalIndices?: DynamoIndex[];
  private readonly localIndices?: DynamoIndex[];

  constructor(schema: DocumentClient.CreateTableInput) {
    const parseSchema = new ParseSchema(schema);

    this.tableName = schema.TableName;
    this.primaryKey = parseSchema.parsePrimaryKey();
    this.globalIndices = parseSchema.parseGlobalIndex();
    this.localIndices = parseSchema.parseLocalIndex();

    this.indexFinder = new IndexFinder(this.primaryKey, this.globalIndices, this.localIndices);
  }

  buildFindUniqueParams(params: {
    where: { [key: string]: AllowedKeyTypes };
  }): DocumentClient.GetItemInput {
    const { where } = params;
    const keys = Object.keys(where);
    const values = keys.map((key) => where[key]);

    if (!this.indexFinder.isPrimaryKey(keys, values))
      throw new DynamoSchemaError('this is not primary key!');

    return { TableName: this.tableName, Key: where };
  }

  private removeDuplicates(indices: IndexScore[]): IndexScore[] {
    const scoreMap = indices.reduce((acc, cur) => {
      acc[cur.indexName] = cur.score;
      return acc;
    }, {});

    return indices.filter((index) => scoreMap[index.indexName] !== index.score);
  }

  private isSameKey(key1: DynamoIndexKeyType, key2: DynamoIndexKeyType) {
    return !key1 && !key2 && key1.name === key2.name && key1.dataType === key2.dataType;
  }

  private compareIndices(index1: IndexScore, index2: IndexScore): IndexScore[] {
    // TODO: 가산점 정책 수립 필요
    if (this.isSameKey(index1.hashKey, index2.hashKey)) {
      if (this.isSameKey(index1.sortKey, index2.sortKey))
        return [{ ...index1, score: index1.score + index2.score }];
      return [{ ...index1, score: index1.score + index2.score }];
    }

    return [{ ...index1 }, { ...index2 }];
  }

  private mergeIndices(indices: [IndexScore[], IndexScore[]]): IndexScore[] {
    const l1 = indices[0].length;
    const l2 = indices[1].length;
    let result: IndexScore[] = [];

    for (let i = 0; i < l1; i++) {
      for (let j = 0; j < l2; j++) {
        const tmp = this.compareIndices(indices[0][i], indices[1][j]);
        result = result.concat(tmp);
      }
    }

    return this.removeDuplicates(result);
  }

  // TODO: 함수 이름 변경
  private integrateIndexScore(indices: IndexScore[][]): IndexScore[] | null {
    if (indices.length === 2) return this.mergeIndices([indices[0], indices[1]]);

    return this.integrateIndexScore([
      this.integrateIndexScore([indices[0], indices[1]]),
      ...indices.slice(2),
    ]);
  }

  buildFindManyParams(params: FindInput): DocumentClient.QueryInput | DocumentClient.ScanInput {
    const { where } = params;
    const and = where[Operator.and];
    const or = where[Operator.or];

    delete where[Operator.and];
    delete where[Operator.or];

    const keys = JSON.stringify(where) !== '{}' ? where : null;

    let keysCount = 0;
    if (and) keysCount++;
    if (or) keysCount++;
    if (keys) keysCount++;

    if (keysCount > 1) throw new DynamoSchemaError('to many where conditions!');

    let result;
    if (and) result = and;
    if (or) result = or;
    if (keys) result = keys;

    return result as any;
  }
}
