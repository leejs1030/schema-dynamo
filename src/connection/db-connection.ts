import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

export class DbConnection {
  private readonly db: DynamoDB;

  constructor(params: DynamoDB.ClientConfiguration) {
    this.db = new DynamoDB(params);
  }

  describeTable(
    params: DynamoDB.DescribeTableInput,
  ): Promise<PromiseResult<DynamoDB.DescribeTableOutput, AWSError>> {
    return this.db.describeTable(params).promise();
  }
}
