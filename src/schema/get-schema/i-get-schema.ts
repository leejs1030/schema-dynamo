import DynamoDB from 'aws-sdk/clients/dynamodb';
export interface IGetSchema {
  getTableLists({
    prefix,
    exclude,
  }?: {
    prefix?: string;
    exclude?: boolean;
  }): Promise<string[]>;

  describeTable(
    TableName: string
  ): Promise<DynamoDB.TableDescription | undefined>;

  getSchema(TableName: string): Promise<DynamoDB.CreateTableInput>;

  getSchemas(TableName: string[]): Promise<DynamoDB.CreateTableInput[]>;
}
