import { DynamoDB } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { DynamoSchemaError } from '../errors';

export class DocumentConnection {
  private readonly document: DynamoDB.DocumentClient;

  constructor(
    params: DynamoDB.DocumentClient.DocumentClientOptions &
      ServiceConfigurationOptions &
      DynamoDB.ClientApiVersions,
  ) {
    this.document = new DynamoDB.DocumentClient(params);
  }

  createSet(
    list: number[] | string[] | DynamoDB.DocumentClient.binaryType[],
    options?: DynamoDB.DocumentClient.CreateSetOptions,
  ) {
    return this.document.createSet(list, options);
  }

  async batchGet(params: DynamoDB.DocumentClient.BatchGetItemInput) {
    return this.document
      .batchGet(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async batchWrite(params: DynamoDB.DocumentClient.BatchWriteItemInput) {
    return this.document
      .batchWrite(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async delete(params: DynamoDB.DocumentClient.DeleteItemInput) {
    return this.document
      .delete(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async get(params: DynamoDB.DocumentClient.GetItemInput) {
    return this.document
      .get(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async put(params: DynamoDB.DocumentClient.PutItemInput) {
    return this.document
      .put(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async query(params: DynamoDB.DocumentClient.QueryInput) {
    return this.document
      .query(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async scan(params: DynamoDB.DocumentClient.ScanInput) {
    return this.document
      .scan(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async update(params: DynamoDB.DocumentClient.UpdateItemInput) {
    return this.document
      .update(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async transactGet(params: DynamoDB.DocumentClient.TransactGetItemsInput) {
    return this.document
      .transactGet(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }

  async transactWrite(params: DynamoDB.DocumentClient.TransactWriteItemsInput) {
    return this.document
      .transactWrite(params)
      .promise()
      .catch((err) => {
        throw new DynamoSchemaError(err);
      });
  }
}
