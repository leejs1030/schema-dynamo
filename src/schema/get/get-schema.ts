import { ClientConfiguration, ListTablesInput } from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { DbConnection } from '../../connection/db-connection';
import { IGetSchema } from './i-get-schema';

export class GetSchema implements IGetSchema {
  private readonly db: DbConnection;

  constructor(params: ClientConfiguration) {
    this.db = new DbConnection(params);
  }

  async getSchema(TableName: string) {
    return this.db
      .describeTable({ TableName })
      .then((data) => data.Table)
      .then(this.parseCreateTableInput);
  }

  async getSchemas(
    params: ListTablesInput,
    prefix: { startWith?: string; notStartWith?: string } = {},
  ) {
    return this.getTableNameLists(params, prefix).then((names) =>
      Promise.all(names.map(this.getSchema)),
    );
  }

  private async getTableNameLists(
    params: ListTablesInput,
    { startWith, notStartWith }: { startWith?: string; notStartWith?: string } = {},
  ) {
    return this.db
      .listTables(params)
      .then((data) => data.TableNames)
      .then((arr) =>
        arr.filter((e: string) => {
          if (startWith) return e.startsWith(startWith);
          else if (notStartWith) return !e.startsWith(notStartWith);
        }),
      );
  }

  private parseCreateTableInput(
    param: DocumentClient.TableDescription,
  ): DocumentClient.CreateTableInput {
    return {
      TableName: param.TableName,
      AttributeDefinitions: param.AttributeDefinitions,
      KeySchema: param.KeySchema,
      GlobalSecondaryIndexes: param.GlobalSecondaryIndexes
        ? param.GlobalSecondaryIndexes.map(
            (globalSecondaryIndex) =>
              ({
                IndexName: globalSecondaryIndex.IndexName,
                KeySchema: globalSecondaryIndex.KeySchema,
                Projection: globalSecondaryIndex.Projection,
                ProvisionedThroughput: globalSecondaryIndex.ProvisionedThroughput
                  ? {
                      ReadCapacityUnits: globalSecondaryIndex.ProvisionedThroughput
                        .ReadCapacityUnits
                        ? globalSecondaryIndex.ProvisionedThroughput.ReadCapacityUnits
                        : 1,
                      WriteCapacityUnits: globalSecondaryIndex.ProvisionedThroughput
                        .WriteCapacityUnits
                        ? globalSecondaryIndex.ProvisionedThroughput.WriteCapacityUnits
                        : 1,
                    }
                  : null,
              } as DocumentClient.GlobalSecondaryIndex),
          )
        : null,
      LocalSecondaryIndexes: param.LocalSecondaryIndexes
        ? param.LocalSecondaryIndexes.map(
            (localSecondaryIndex) =>
              ({
                IndexName: localSecondaryIndex.IndexName,
                KeySchema: localSecondaryIndex.KeySchema,
                Projection: localSecondaryIndex.Projection,
              } as DocumentClient.LocalSecondaryIndex),
          )
        : null,
      ProvisionedThroughput: param.ProvisionedThroughput
        ? {
            ReadCapacityUnits: param.ProvisionedThroughput.ReadCapacityUnits
              ? param.ProvisionedThroughput.ReadCapacityUnits
              : 1,
            WriteCapacityUnits: param.ProvisionedThroughput.WriteCapacityUnits
              ? param.ProvisionedThroughput.WriteCapacityUnits
              : 1,
          }
        : null,
      BillingMode:
        param.BillingModeSummary && param.BillingModeSummary.BillingMode
          ? param.BillingModeSummary.BillingMode
          : null,
      StreamSpecification: param.StreamSpecification
        ? param.StreamSpecification
        : { StreamEnabled: false },
    };
  }
}
