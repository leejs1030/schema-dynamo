import DynamoDB from 'aws-sdk/clients/dynamodb';
export interface GetSchema {
  constructor(dynamoService: DynamoDB): GetSchema;
  getTableLists({
    prefix,
    exclude,
  }?: {
    prefix: string;
    exclude: boolean;
  }): Promise<string[]>;
  describeTable(
    TableName: string
  ): Promise<DynamoDB.TableDescription | undefined>;
  getSchema(
    TableName: string | string[]
  ): Promise<DynamoDB.CreateTableInput | Promise<DynamoDB.CreateTableInput>[]>;
}
