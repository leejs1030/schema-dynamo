import { DocumentConnection } from '../../connection/document-connection';
import { DbConnection } from '../../connection/db-connection';
import { ClientConfiguration, DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Orm } from '../orm/orm';
import { IOrm } from '../orm/i-orm';

export class SchemaDynamo {
  private readonly documentClient: DocumentConnection;
  private readonly dynamoDb: DbConnection;

  constructor(params: ClientConfiguration) {
    this.documentClient = new DocumentConnection(params);
    this.dynamoDb = new DbConnection(params);
  }

  getObject(schema: DocumentClient.CreateTableInput): IOrm {
    return new Orm(schema, this.dynamoDb, this.documentClient);
  }
}
