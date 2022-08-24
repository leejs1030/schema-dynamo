import { DocumentConnection } from '../connection/document-connection';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

type LocalSecondaryIndex = DocumentClient.LocalSecondaryIndex;
type GlobalSecondaryIndex = DocumentClient.GlobalSecondaryIndex;

export abstract class OrmBase {
  protected readonly TableName: string;
  protected readonly document: DocumentConnection;
  protected readonly Indexes: (LocalSecondaryIndex | GlobalSecondaryIndex)[];

  protected readonly key: DocumentClient.KeySchema;

  constructor(document: DocumentConnection, TableSchema: DocumentClient.CreateTableInput) {
    this.document = document;
    this.TableName = TableSchema.TableName;
    this.key = TableSchema.KeySchema;
    this.Indexes = [...TableSchema.LocalSecondaryIndexes, ...TableSchema.GlobalSecondaryIndexes];
  }

  async findOne() {
    throw new Error('to be defined!');
  }

  async findMany() {
    throw new Error('to be defined!');
  }

  put() {
    return this.document.put({
      TableName: this.TableName,
      Item: {},
    });
  }

  update() {
    return this.document.update({
      TableName: this.TableName,
      Key: {},
    });
  }

  delete() {
    return this.document.delete({
      TableName: this.TableName,
      Key: {},
    });
  }

  abstract batchGet();

  abstract batchWrite();

  abstract transactGet();

  abstract transactWrite();
}
