import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DbConnection } from '../../connection/db-connection';
import { DocumentConnection } from '../../connection/document-connection';
import PrimaryKey = Typing.PrimaryKey;
import DynamoIndex = Typing.DynamoIndex;
import { ParseSchema } from '../../schema/parse/parse-schema';

export class Orm {
  private readonly primaryKey: PrimaryKey;
  private readonly globalIndex?: DynamoIndex[];
  private readonly localIndex?: DynamoIndex[];

  constructor(
    schema: DocumentClient.CreateTableInput,
    private readonly dynamoDb: DbConnection,
    private readonly documentClient: DocumentConnection,
  ) {
    const parseSchema = new ParseSchema(schema);

    this.primaryKey = parseSchema.parsePrimaryKey();
    this.globalIndex = parseSchema.parseGlobalIndex();
    this.localIndex = parseSchema.parseLocalIndex();
  }
}
