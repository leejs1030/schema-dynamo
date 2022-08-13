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

  batchExecuteStatement(params) {
    return this.db.batchExecuteStatement(params).promise();
  }

  batchGetItem(params) {
    return this.db.batchGetItem(params).promise();
  }

  batchWriteItem(params) {
    return this.db.batchWriteItem(params).promise();
  }

  createBackup(params) {
    return this.db.createBackup(params).promise();
  }

  createGlobalTable(params) {
    return this.db.createGlobalTable(params).promise();
  }

  createTable(params) {
    return this.db.createTable(params).promise();
  }

  deleteBackup(params) {
    return this.db.deleteTable(params).promise();
  }

  deleteItem(params) {
    return this.db.deleteItem(params).promise();
  }

  deleteTable(params) {
    return this.db.deleteTable(params).promise();
  }

  describeBackup(params) {
    return this.db.describeBackup(params).promise();
  }

  describeContinuousBackups(params) {
    return this.db.describeContinuousBackups(params).promise();
  }

  describeContributorInsights(params) {
    return this.db.describeContributorInsights(params).promise();
  }

  describeEndpoints(params) {
    return this.db.describeEndpoints(params).promise();
  }

  describeExport(params) {
    return this.db.describeExport(params).promise();
  }

  describeGlobalTable(params) {
    return this.db.describeGlobalTable(params).promise();
  }

  describeGlobalTableSettings(params) {
    return this.db.describeGlobalTableSettings(params).promise();
  }

  describeKinesisStreamingDestination(params) {
    return this.db.describeKinesisStreamingDestination(params).promise();
  }

  describeLimits(params) {
    return this.db.describeLimits(params).promise();
  }

  describeTableReplicaAutoScaling(params) {
    return this.db.describeTableReplicaAutoScaling(params).promise();
  }

  describeTimeToLive(params) {
    return this.db.describeTimeToLive(params).promise();
  }

  disableKinesisStreamingDestination(params) {
    return this.db.disableKinesisStreamingDestination(params).promise();
  }

  enableKinesisStreamingDestination(params) {
    return this.db.enableKinesisStreamingDestination(params).promise();
  }

  executeStatement(params) {
    return this.db.executeStatement(params).promise();
  }

  executeTransaction(params) {
    return this.db.executeTransaction(params).promise();
  }

  exportTableToPointInTime(params) {
    return this.db.exportTableToPointInTime(params).promise();
  }

  getItem(params) {
    return this.db.getItem(params).promise();
  }

  listBackups(params) {
    return this.db.listBackups(params).promise();
  }

  listContributorInsights(params) {
    return this.db.listContributorInsights(params).promise();
  }

  listExports(params) {
    return this.db.listExports(params).promise();
  }

  listGlobalTables(params) {
    return this.db.listGlobalTables(params).promise();
  }

  listTables(params) {
    return this.db.listTables(params).promise();
  }

  listTagsOfResource(params) {
    return this.db.listTagsOfResource(params).promise();
  }

  putItem(params) {
    return this.db.putItem(params).promise();
  }

  query(params) {
    return this.db.query(params).promise();
  }

  restoreTableFromBackup(params) {
    return this.db.restoreTableFromBackup(params).promise();
  }

  restoreTableToPointInTime(params) {
    return this.db.restoreTableToPointInTime(params).promise();
  }

  scan(params) {
    return this.db.scan(params).promise();
  }

  tagResource(params) {
    return this.db.tagResource(params).promise();
  }

  transactGetItems(params) {
    return this.db.transactGetItems(params).promise();
  }

  transactWriteItems(params) {
    return this.db.transactWriteItems(params).promise();
  }

  untagResource(params) {
    return this.db.untagResource(params).promise();
  }

  updateContinuousBackups(params) {
    return this.db.updateContinuousBackups(params).promise();
  }

  updateContributorInsights(params) {
    return this.db.updateContributorInsights(params).promise();
  }

  updateGlobalTable(params) {
    return this.db.updateGlobalTable(params).promise();
  }

  updateGlobalTableSettings(params) {
    return this.db.updateGlobalTableSettings(params).promise();
  }

  updateItem(params) {
    return this.db.updateItem(params).promise();
  }

  updateTable(params) {
    return this.db.updateTable(params).promise();
  }

  updateTableReplicaAutoScaling(params) {
    return this.db.updateTableReplicaAutoScaling(params).promise();
  }

  updateTimeToLive(params) {
    return this.db.updateTimeToLive(params).promise();
  }

  waitFor(state, params) {
    return this.db.waitFor(state, params).promise();
  }
}
