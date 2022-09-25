import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DbConnection } from '../../connection/db-connection';
import { DocumentConnection } from '../../connection/document-connection';
import { AllowedKeyTypes, FindInput } from '../../typing/typing';
import { QueryBuilder } from '../query-builder/query-builder';

export class Orm {
  private readonly queryBuilder: QueryBuilder;

  constructor(
    schema: DocumentClient.CreateTableInput,
    private readonly dynamoDb: DbConnection,
    private readonly documentClient: DocumentConnection,
  ) {
    this.queryBuilder = new QueryBuilder(schema);
  }

  async findUnique(params: { where: { [key: string]: AllowedKeyTypes } }) {
    const query = this.queryBuilder.buildGetQueryParams(params);
    return this.documentClient.get(query);
  }

  private canBeQueried(
    params: DocumentClient.QueryInput | DocumentClient.ScanInput,
  ): params is DocumentClient.QueryInput {
    return !!(params.IndexName || (params as any).KeyConditionExpression);
  }

  async find(params: FindInput): Promise<any> {
    const query = this.queryBuilder.buildQueryQueryParams(params);
    if (this.canBeQueried(query)) return this.documentClient.query(query);
    return this.documentClient.scan(query);
  }
}
