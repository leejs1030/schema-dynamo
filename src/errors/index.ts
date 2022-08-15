export class SchemaDynamoError extends Error {
  constructor(params: string) {
    super(`DynamoSchema Error: ${params}`);
  }
}
