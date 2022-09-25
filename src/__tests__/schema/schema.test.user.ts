export const UserSchema = {
  TableName: 'schema.test.user',
  AttributeDefinitions: [
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'nickname', AttributeType: 'S' },
  ],
  KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'nickname-gsi',
      KeySchema: [{ AttributeName: 'nickname', KeyType: 'HASH' }],
      Projection: { ProjectionType: 'ALL' },
      ProvisionedThroughput: { ReadCapacityUnits: 3, WriteCapacityUnits: 3 },
    },
  ],
  LocalSecondaryIndexes: null,
  ProvisionedThroughput: { ReadCapacityUnits: 3, WriteCapacityUnits: 3 },
  BillingMode: null,
  StreamSpecification: { StreamEnabled: false },
};
