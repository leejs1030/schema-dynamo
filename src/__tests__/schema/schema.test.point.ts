export const PointSchema = {
  TableName: 'schema.test.point',
  AttributeDefinitions: [
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'createdAt', AttributeType: 'S' },
    { AttributeName: 'typeId', AttributeType: 'S' },
    { AttributeName: 'type', AttributeType: 'S' },
    { AttributeName: 'point', AttributeType: 'N' },
  ],
  KeySchema: [
    { AttributeName: 'userId', KeyType: 'HASH' },
    { AttributeName: 'createdAt', KeyType: 'RANGE' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'type-point-gsi',
      KeySchema: [
        { AttributeName: 'type', KeyType: 'HASH' },
        { AttributeName: 'point', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
      ProvisionedThroughput: { ReadCapacityUnits: 3, WriteCapacityUnits: 3 },
    },
  ],
  LocalSecondaryIndexes: [
    {
      IndexName: 'userId-typeId-lsi',
      KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
        { AttributeName: 'typeId', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
    {
      IndexName: 'userId-type-lsi',
      KeySchema: [
        { AttributeName: 'userId', KeyType: 'HASH' },
        { AttributeName: 'type', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
  ],
  ProvisionedThroughput: { ReadCapacityUnits: 3, WriteCapacityUnits: 3 },
  BillingMode: null,
  StreamSpecification: { StreamEnabled: false },
};
