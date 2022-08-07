import DynamoDB, {
  AttributeDefinitions,
  CreateTableInput,
  DocumentClient,
  GlobalSecondaryIndex,
  GlobalSecondaryIndexList,
  KeySchema,
  LocalSecondaryIndex,
  TableDescription,
} from 'aws-sdk/clients/dynamodb';

export class GetSchema {
  private readonly dynamoService: DynamoDB;
  constructor(dynamoService: DynamoDB) {
    this.dynamoService = dynamoService;
  }

  private parseCreateTableInput(param?: TableDescription): CreateTableInput {
    if (!param) return {} as any;
    return {
      TableName: param.TableName as string,
      AttributeDefinitions: param.AttributeDefinitions as AttributeDefinitions,
      KeySchema: param.KeySchema as KeySchema,
      GlobalSecondaryIndexes: param.GlobalSecondaryIndexes
        ? param.GlobalSecondaryIndexes.map(
            (globalSecondaryIndex) =>
              ({
                IndexName: globalSecondaryIndex.IndexName,
                KeySchema: globalSecondaryIndex.KeySchema,
                Projection: globalSecondaryIndex.Projection,
                ProvisionedThroughput:
                  globalSecondaryIndex.ProvisionedThroughput
                    ? {
                        ReadCapacityUnits: globalSecondaryIndex
                          .ProvisionedThroughput.ReadCapacityUnits
                          ? globalSecondaryIndex.ProvisionedThroughput
                              .ReadCapacityUnits
                          : 1,
                        WriteCapacityUnits: globalSecondaryIndex
                          .ProvisionedThroughput.WriteCapacityUnits
                          ? globalSecondaryIndex.ProvisionedThroughput
                              .WriteCapacityUnits
                          : 1,
                      }
                    : undefined,
              } as GlobalSecondaryIndex)
          )
        : undefined,
      LocalSecondaryIndexes: param.LocalSecondaryIndexes
        ? param.LocalSecondaryIndexes.map(
            (localSecondaryIndex) =>
              ({
                IndexName: localSecondaryIndex.IndexName,
                KeySchema: localSecondaryIndex.KeySchema,
                Projection: localSecondaryIndex.Projection,
              } as LocalSecondaryIndex)
          )
        : undefined,
      ProvisionedThroughput: param.ProvisionedThroughput
        ? {
            ReadCapacityUnits: param.ProvisionedThroughput.ReadCapacityUnits
              ? param.ProvisionedThroughput.ReadCapacityUnits
              : 1,
            WriteCapacityUnits: param.ProvisionedThroughput.WriteCapacityUnits
              ? param.ProvisionedThroughput.WriteCapacityUnits
              : 1,
          }
        : undefined,
      BillingMode:
        param.BillingModeSummary && param.BillingModeSummary.BillingMode
          ? param.BillingModeSummary.BillingMode
          : undefined,
      StreamSpecification: param.StreamSpecification
        ? param.StreamSpecification
        : { StreamEnabled: false },
    };
  }

  async getTableLists(
    { prefix, exclude }: { prefix: string; exclude: boolean } = {
      prefix: '',
      exclude: false,
    }
  ) {
    return this.dynamoService
      .listTables({})
      .promise()
      .then((data) => data.TableNames || [])
      .then((arr) =>
        arr.filter((e: string) =>
          exclude ? !e.startsWith(prefix) : e.startsWith(prefix)
        )
      );
  }

  async describeTable(TableName: string) {
    return this.dynamoService
      .describeTable({ TableName })
      .promise()
      .then((data) => data.Table);
  }

  async getSchema(TableName: string | string[]) {
    if (Array.isArray(TableName))
      return TableName.map((name) =>
        this.describeTable(name).then(this.parseCreateTableInput)
      );
    return this.describeTable(TableName).then(this.parseCreateTableInput);
  }
}
