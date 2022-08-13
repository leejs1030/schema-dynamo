import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { WaiterConfiguration } from 'aws-sdk/lib/service';

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

  batchExecuteStatement(params: DynamoDB.BatchExecuteStatementInput) {
    return this.db.batchExecuteStatement(params).promise();
  }

  batchGetItem(params: DynamoDB.BatchGetItemInput) {
    return this.db.batchGetItem(params).promise();
  }

  batchWriteItem(params: DynamoDB.BatchWriteItemInput) {
    return this.db.batchWriteItem(params).promise();
  }

  createBackup(params: DynamoDB.CreateBackupInput) {
    return this.db.createBackup(params).promise();
  }

  createGlobalTable(params: DynamoDB.CreateGlobalTableInput) {
    return this.db.createGlobalTable(params).promise();
  }

  createTable(params: DynamoDB.CreateTableInput) {
    return this.db.createTable(params).promise();
  }

  deleteBackup(params: DynamoDB.DeleteTableInput) {
    return this.db.deleteTable(params).promise();
  }

  deleteItem(params: DynamoDB.DeleteItemInput) {
    return this.db.deleteItem(params).promise();
  }

  deleteTable(params: DynamoDB.DeleteTableInput) {
    return this.db.deleteTable(params).promise();
  }

  describeBackup(params: DynamoDB.DescribeBackupInput) {
    return this.db.describeBackup(params).promise();
  }

  describeContinuousBackups(params: DynamoDB.DescribeContinuousBackupsInput) {
    return this.db.describeContinuousBackups(params).promise();
  }

  describeContributorInsights(params: DynamoDB.DescribeContributorInsightsInput) {
    return this.db.describeContributorInsights(params).promise();
  }

  describeEndpoints(params: DynamoDB.DescribeEndpointsRequest) {
    return this.db.describeEndpoints(params).promise();
  }

  describeExport(params: DynamoDB.DescribeExportInput) {
    return this.db.describeExport(params).promise();
  }

  describeGlobalTable(params: DynamoDB.DescribeGlobalTableInput) {
    return this.db.describeGlobalTable(params).promise();
  }

  describeGlobalTableSettings(params: DynamoDB.DescribeGlobalTableSettingsInput) {
    return this.db.describeGlobalTableSettings(params).promise();
  }

  describeKinesisStreamingDestination(params: DynamoDB.DescribeKinesisStreamingDestinationInput) {
    return this.db.describeKinesisStreamingDestination(params).promise();
  }

  describeLimits(params: DynamoDB.DescribeLimitsInput) {
    return this.db.describeLimits(params).promise();
  }

  describeTableReplicaAutoScaling(params: DynamoDB.DescribeTableReplicaAutoScalingInput) {
    return this.db.describeTableReplicaAutoScaling(params).promise();
  }

  describeTimeToLive(params: DynamoDB.DescribeTimeToLiveInput) {
    return this.db.describeTimeToLive(params).promise();
  }

  disableKinesisStreamingDestination(params: DynamoDB.KinesisStreamingDestinationInput) {
    return this.db.disableKinesisStreamingDestination(params).promise();
  }

  enableKinesisStreamingDestination(params: DynamoDB.KinesisStreamingDestinationInput) {
    return this.db.enableKinesisStreamingDestination(params).promise();
  }

  executeStatement(params: DynamoDB.ExecuteStatementInput) {
    return this.db.executeStatement(params).promise();
  }

  executeTransaction(params: DynamoDB.ExecuteTransactionInput) {
    return this.db.executeTransaction(params).promise();
  }

  exportTableToPointInTime(params: DynamoDB.ExportTableToPointInTimeInput) {
    return this.db.exportTableToPointInTime(params).promise();
  }

  getItem(params: DynamoDB.GetItemInput) {
    return this.db.getItem(params).promise();
  }

  listBackups(params: DynamoDB.ListBackupsInput) {
    return this.db.listBackups(params).promise();
  }

  listContributorInsights(params: DynamoDB.ListContributorInsightsInput) {
    return this.db.listContributorInsights(params).promise();
  }

  listExports(params: DynamoDB.ListExportsInput) {
    return this.db.listExports(params).promise();
  }

  listGlobalTables(params: DynamoDB.ListGlobalTablesInput) {
    return this.db.listGlobalTables(params).promise();
  }

  listTables(params: DynamoDB.ListTablesInput) {
    return this.db.listTables(params).promise();
  }

  listTagsOfResource(params: DynamoDB.ListTagsOfResourceInput) {
    return this.db.listTagsOfResource(params).promise();
  }

  putItem(params: DynamoDB.PutItemInput) {
    return this.db.putItem(params).promise();
  }

  query(params: DynamoDB.QueryInput) {
    return this.db.query(params).promise();
  }

  restoreTableFromBackup(params: DynamoDB.RestoreTableFromBackupInput) {
    return this.db.restoreTableFromBackup(params).promise();
  }

  restoreTableToPointInTime(params: DynamoDB.RestoreTableToPointInTimeInput) {
    return this.db.restoreTableToPointInTime(params).promise();
  }

  scan(params: DynamoDB.ScanInput) {
    return this.db.scan(params).promise();
  }

  tagResource(params: DynamoDB.TagResourceInput) {
    return this.db.tagResource(params).promise();
  }

  transactGetItems(params: DynamoDB.TransactGetItemsInput) {
    return this.db.transactGetItems(params).promise();
  }

  transactWriteItems(params: DynamoDB.TransactWriteItemsInput) {
    return this.db.transactWriteItems(params).promise();
  }

  untagResource(params: DynamoDB.UntagResourceInput) {
    return this.db.untagResource(params).promise();
  }

  updateContinuousBackups(params: DynamoDB.UpdateContinuousBackupsInput) {
    return this.db.updateContinuousBackups(params).promise();
  }

  updateContributorInsights(params: DynamoDB.UpdateContributorInsightsInput) {
    return this.db.updateContributorInsights(params).promise();
  }

  updateGlobalTable(params: DynamoDB.UpdateGlobalTableInput) {
    return this.db.updateGlobalTable(params).promise();
  }

  updateGlobalTableSettings(params: DynamoDB.UpdateGlobalTableSettingsInput) {
    return this.db.updateGlobalTableSettings(params).promise();
  }

  updateItem(params: DynamoDB.UpdateItemInput) {
    return this.db.updateItem(params).promise();
  }

  updateTable(params: DynamoDB.UpdateTableInput) {
    return this.db.updateTable(params).promise();
  }

  updateTableReplicaAutoScaling(params: DynamoDB.UpdateTableReplicaAutoScalingInput) {
    return this.db.updateTableReplicaAutoScaling(params).promise();
  }

  updateTimeToLive(params: DynamoDB.UpdateTimeToLiveInput) {
    return this.db.updateTimeToLive(params).promise();
  }

  waitFor(
    state: 'tableExists' | 'tableNotExists',
    params: DynamoDB.DescribeTableInput & { $waiter?: WaiterConfiguration },
  ) {
    return this.db.waitFor(state as any, params).promise();
  }
}
