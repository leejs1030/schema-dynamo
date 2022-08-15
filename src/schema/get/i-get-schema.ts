import { ListTablesInput } from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

export interface IGetSchema {
  getSchema(TableName: string): Promise<DocumentClient.CreateTableInput>;

  getSchemas(
    params: ListTablesInput,
    prefix?: {
      startWith?: string;
      notStartWith?: string;
    },
  ): Promise<DocumentClient.CreateTableInput[]>;
}
