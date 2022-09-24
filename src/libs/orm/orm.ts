import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DbConnection } from '../../connection/db-connection';
import { DocumentConnection } from '../../connection/document-connection';
import { ParseSchema } from '../../schema/parse/parse-schema';
import { DynamoSchemaError } from '../../errors';
import { IndexFinder } from './index-finder';
import { DynamoIndex, PrimaryKey } from '../../typing/typing';

export class Orm {
  private readonly indexFinder: IndexFinder;
  private readonly tableName: string;
  private readonly primaryKey: PrimaryKey;
  private readonly globalIndex?: DynamoIndex[];
  private readonly localIndex?: DynamoIndex[];

  constructor(
    schema: DocumentClient.CreateTableInput,
    private readonly dynamoDb: DbConnection,
    private readonly documentClient: DocumentConnection,
  ) {
    const parseSchema = new ParseSchema(schema);

    this.tableName = schema.TableName;
    this.primaryKey = parseSchema.parsePrimaryKey();
    this.globalIndex = parseSchema.parseGlobalIndex();
    this.localIndex = parseSchema.parseLocalIndex();

    this.indexFinder = new IndexFinder(this.primaryKey, this.globalIndex, this.localIndex);
  }

  async findUnique(params: { where: { [key: string]: string | number | Buffer } }) {
    const { where } = params;
    const keys = Object.keys(where);
    const values = keys.map((key) => where[key]);

    if (!this.indexFinder.isPrimaryKey(keys, values))
      throw new DynamoSchemaError('this is not primary key!');

    return this.documentClient.get({ TableName: this.tableName, Key: where });
  }
}
