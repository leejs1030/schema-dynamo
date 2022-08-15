import { ClientConfiguration, ListTablesInput } from 'aws-sdk/clients/dynamodb';
import { GetSchema } from '../get/get-schema';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

export class WriteSchema {
  private readonly getSchema: GetSchema;

  constructor(params: ClientConfiguration) {
    this.getSchema = new GetSchema(params);
  }

  async writeSchema(fileDirectory: string, TableName: string) {
    const schema = await this.getSchema.getSchema(TableName);
    return fs.writeFileSync(
      path.join(fileDirectory, `${schema.TableName}.json`),
      prettier.format(`module.exports = ${JSON.stringify(schema)}`, {
        parser: 'typescript',
      }),
    );
  }

  async writeSchemas(
    fileDirectory: string,
    params: ListTablesInput,
    prefix: { startWith?: string; notStartWith?: string } = {},
  ) {
    const schemas = await this.getSchema.getSchemas(params, prefix);
    return schemas.map((schema) =>
      fs.writeFileSync(
        path.join(fileDirectory, `${schema.TableName}.json`),
        prettier.format(`module.exports = ${JSON.stringify(schema)}`, {
          parser: 'typescript',
        }),
      ),
    );
  }
}
