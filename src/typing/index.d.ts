declare namespace Typing {
  declare interface PrimaryKey {
    hashKey: { name: string; dataType: string };
    sortKey?: { name: string; dataType: string };
  }

  declare interface DynamoIndex extends PrimaryKey {
    indexName: string;
  }
}
