import { AllowedKeyTypes, FindInput } from '../../typing/typing';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface IQueryBuilder {
  buildFindUniqueParams(params: {
    where: { [key: string]: AllowedKeyTypes };
  }): DocumentClient.GetItemInput;

  buildFindManyParams(params: FindInput): DocumentClient.QueryInput | DocumentClient.ScanInput;
}
