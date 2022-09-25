import {
  DocumentClient,
  GlobalSecondaryIndexList,
  KeySchema,
  KeySchemaElement,
  LocalSecondaryIndexList,
} from 'aws-sdk/clients/dynamodb';
import { DynamoIndex, PrimaryKey } from '../../typing/typing';

export class ParseSchema {
  private readonly hash = 'HASH';
  private readonly sort = 'RANGE';

  constructor(private readonly schema: DocumentClient.CreateTableInput) {}

  private findHashOrSortKey(acc: PrimaryKey, cur: KeySchemaElement) {
    const { AttributeType } = this.findAttributeByName(cur.AttributeName);

    switch (cur.KeyType) {
      case this.hash:
        acc.hashKey = { name: cur.AttributeName, dataType: AttributeType };
        return acc;
      case this.sort:
        acc.sortKey = { name: cur.AttributeName, dataType: AttributeType };
        return acc;
    }

    return acc;
  }

  private findAttributeByName(name: string): {
    AttributeName: string;
    AttributeType: 'S' | 'N' | 'B';
  } {
    return this.schema.AttributeDefinitions.filter(
      (value) => value.AttributeName === name,
    )[0] as any;
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
    return this.parseIndex(this.schema.LocalSecondaryIndexes || []);
  }

  parseGlobalIndex(): DynamoIndex[] {
    return this.parseIndex(this.schema.GlobalSecondaryIndexes || []);
  }
}
