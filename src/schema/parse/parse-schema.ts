import {
  DocumentClient,
  GlobalSecondaryIndexList,
  KeySchema,
  KeySchemaElement,
  LocalSecondaryIndexList,
} from 'aws-sdk/clients/dynamodb';
import PrimaryKey = Typing.PrimaryKey;
import DynamoIndex = Typing.DynamoIndex;

export class ParseSchema {
  private readonly typeMapper = { S: 'string', N: 'number', B: 'binary' };

  private readonly hash = 'HASH';
  private readonly sort = 'RANGE';

  constructor(private readonly schema: DocumentClient.CreateTableInput) {}

  private findHashOrSortKey(acc: PrimaryKey, cur: KeySchemaElement) {
    const { AttributeType } = this.findAttributeByName(cur.AttributeName);
    const dataType = this.typeMapper[AttributeType];

    switch (cur.KeyType) {
      case this.hash:
        acc.hashKey = { name: cur.AttributeName, dataType };
        return acc;
      case this.sort:
        acc.sortKey = { name: cur.AttributeName, dataType };
        return acc;
    }

    return acc;
  }

  private findAttributeByName(name: string) {
    return this.schema.AttributeDefinitions.filter((value) => value.AttributeName === name)[0];
  }

  private parseKeySchema(keySchema: KeySchema) {
    return keySchema.reduce((acc, cur) => this.findHashOrSortKey(acc, cur), {} as PrimaryKey);
  }

  parsePrimaryKey(): PrimaryKey {
    return this.parseKeySchema(this.schema.KeySchema);
  }

  private parseIndex(index: LocalSecondaryIndexList | GlobalSecondaryIndexList) {
    return index.map((value) => {
      const keySchema = this.parseKeySchema(value.KeySchema);
      return { ...keySchema, indexName: value.IndexName };
    });
  }

  parseLocalIndex(): DynamoIndex[] {
    return this.parseIndex(this.schema.LocalSecondaryIndexes);
  }

  parseGlobalIndex(): DynamoIndex[] {
    return this.parseIndex(this.schema.GlobalSecondaryIndexes);
  }
}
