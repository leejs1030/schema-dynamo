import { ListTablesInput } from 'aws-sdk/clients/dynamodb';

export interface IWriteSchema {
  writeSchema(fileDirectory: string, TableName: string): Promise<void>;

  writeSchemas(
    fileDirectory: string,
    params: ListTablesInput,
    prefix?: {
      startWith?: string;
      notStartWith?: string;
    },
  ): Promise<void[]>;
}
