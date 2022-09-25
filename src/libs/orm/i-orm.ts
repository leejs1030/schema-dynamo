import { AllowedKeyTypes, FindInput } from '../../typing/typing';
import { PromiseResult } from 'aws-sdk/lib/request';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk';

export interface IOrm {
  findUnique(params: {
    where: { [key: string]: AllowedKeyTypes };
  }): Promise<PromiseResult<DocumentClient.GetItemOutput, AWSError>>;

  findMany(
    params: FindInput,
  ): Promise<PromiseResult<DocumentClient.QueryOutput | DocumentClient.ScanOutput, AWSError>>;
}
