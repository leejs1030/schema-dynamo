import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ParseSchema } from '../../schema/parse/parse-schema';
import { IndexFinder } from '../index-finder/index-finder';
import { AllowedKeyTypes, DynamoIndex, FindInput, Operator, PrimaryKey } from '../../typing/typing';
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
