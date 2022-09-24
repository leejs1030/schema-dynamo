export interface PrimaryKey {
  hashKey: { name: string; dataType: string };
  sortKey?: { name: string; dataType: string };
}

export interface DynamoIndex extends PrimaryKey {
  indexName: string;
}
