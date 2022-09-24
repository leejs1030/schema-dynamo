import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DbConnection } from '../../connection/db-connection';
import { DocumentConnection } from '../../connection/document-connection';
import { ParseSchema } from '../../schema/parse/parse-schema';
import { DynamoSchemaError } from '../../errors';
import { IndexFinder } from './index-finder';
import { AllowedKeyTypes, DynamoIndex, FindInput, Operator, PrimaryKey } from '../../typing/typing';

export class Orm {
  private readonly indexFinder: IndexFinder;
  private readonly tableName: string;
  private readonly primaryKey: PrimaryKey;
  private readonly globalIndices?: DynamoIndex[];
  private readonly localIndices?: DynamoIndex[];

  constructor(
    schema: DocumentClient.CreateTableInput,
    private readonly dynamoDb: DbConnection,
    private readonly documentClient: DocumentConnection,
  ) {
    const parseSchema = new ParseSchema(schema);

    this.tableName = schema.TableName;
    this.primaryKey = parseSchema.parsePrimaryKey();
    this.globalIndices = parseSchema.parseGlobalIndex();
    this.localIndices = parseSchema.parseLocalIndex();

    this.indexFinder = new IndexFinder(this.primaryKey, this.globalIndices, this.localIndices);
  }

  async findUnique(params: { where: { [key: string]: AllowedKeyTypes } }) {
    const { where } = params;
    const keys = Object.keys(where);
    const values = keys.map((key) => where[key]);

    if (!this.indexFinder.isPrimaryKey(keys, values))
      throw new DynamoSchemaError('this is not primary key!');

    return this.documentClient.get({ TableName: this.tableName, Key: where });
  }

  async find(params: FindInput): Promise<any> {
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

    return result;
  }
}
