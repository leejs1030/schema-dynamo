export class DynamoSchemaError extends Error {
  constructor(params: string) {
    super(`DynamoSchema Error: ${params}`);
  }
}
