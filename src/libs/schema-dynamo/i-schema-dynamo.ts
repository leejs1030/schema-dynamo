import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IOrm } from '../orm/i-orm';

export interface ISchemaDynamo {
  getObject(schema: DocumentClient.CreateTableInput): IOrm;
}
