export interface PrimaryKey {
  hashKey: { name: string; dataType: 'S' | 'N' | 'B' };
  sortKey?: { name: string; dataType: 'S' | 'N' | 'B' };
}

export interface DynamoIndex extends PrimaryKey {
  indexName: string;
}

export type AllowedKeyTypes = string | number | Buffer;

export type OperatorTypes = {
  readonly and: unique symbol;
  readonly or: unique symbol;
  readonly gte: unique symbol;
  readonly gt: unique symbol;
  readonly lte: unique symbol;
  readonly lt: unique symbol;
  readonly eq: unique symbol;
  readonly ne: unique symbol;
  readonly contains: unique symbol;
  readonly notContains: unique symbol;
  readonly startsWith: unique symbol;
  readonly between: unique symbol;
  readonly exists: unique symbol;
  readonly notExists: unique symbol;
};

export const Operator = {
  and: Symbol.for('and'),
  or: Symbol.for('or'),
  gte: Symbol.for('gte'),
  gt: Symbol.for('gt'),
  lte: Symbol.for('lte'),
  lt: Symbol.for('lt'),
  eq: Symbol.for('eq'),
  ne: Symbol.for('ne'),
  contains: Symbol.for('contain'),
  notContains: Symbol.for('contain'),
  startsWith: Symbol.for('starts'),
  between: Symbol.for('between'),
} as OperatorTypes;

export type AllowedColumTypes = string | number | boolean | Buffer | null;

export type AndOperatorValueTypes = FindWhereInput[];
export type OrOperatorValueTypes = FindWhereInput[];
export type GteOperatorValueTypes = string | number | Buffer;
export type GtOperatorValueTypes = string | number | Buffer;
export type LteOperatorValueTypes = string | number | Buffer;
export type LtOperatorValueTypes = string | number | Buffer;
export type EqOperatorValueTypes = string | number | Buffer | boolean;
export type NeOperatorValueTypes = string | number | Buffer | boolean;
export type ContainsOperatorValueTypes = [string | Buffer, string | Buffer];
export type NotContainsOperatorValueTypes = [string | Buffer, string | Buffer];
export type StartsWithOperatorValueTypes = string | Buffer;
export type BetweenOperatorValueTypes = [string | number | Buffer, string | number | Buffer];

export interface AndOperatorKeyValueTypes {
  [Operator.and]: AndOperatorValueTypes;
}
export interface OrOperatorKeyValueTypes {
  [Operator.or]: OrOperatorValueTypes;
}

export interface StartsWithOperatorKeyValueTypes {
  [Operator.startsWith]?: StartsWithOperatorValueTypes;
}

export interface BetweenOperatorKeyValueTypes {
  [Operator.between]?: BetweenOperatorValueTypes;
}

export interface NotContainsOperatorKeyValueTypes {
  [Operator.notContains]?: NotContainsOperatorValueTypes;
}

export interface ContainsOperatorKeyValueTypes {
  [Operator.contains]?: ContainsOperatorValueTypes;
}

export interface NeOperatorKeyValueTypes {
  [Operator.ne]?: NeOperatorValueTypes;
}

export interface EqOperatorKeyValueTypes {
  [Operator.eq]?: EqOperatorValueTypes;
}

export interface LteOperatorKeyValueTypes {
  [Operator.lt]?: LteOperatorValueTypes;
}

export interface GteOperatorKeyValueTypes {
  [Operator.gte]?: GteOperatorValueTypes;
}

export interface GtOperatorKeyValueTypes {
  [Operator.gt]?: GtOperatorValueTypes;
}

export interface LtOperatorKeyValueTypes {
  [Operator.lt]?: LtOperatorValueTypes;
}

export interface FindKeysWhereType {
  [key: string]:
    | AllowedColumTypes
    | GteOperatorKeyValueTypes
    | GtOperatorKeyValueTypes
    | LteOperatorKeyValueTypes
    | LtOperatorKeyValueTypes
    | EqOperatorKeyValueTypes
    | NeOperatorKeyValueTypes
    | ContainsOperatorKeyValueTypes
    | NotContainsOperatorKeyValueTypes
    | StartsWithOperatorKeyValueTypes
    | BetweenOperatorKeyValueTypes
    | AndOperatorKeyValueTypes
    | OrOperatorKeyValueTypes;
}

export type FindWhereInput = AndOperatorKeyValueTypes | OrOperatorKeyValueTypes | FindKeysWhereType;

export interface FindInput {
  where?: FindWhereInput;
  targetLimit?: number;
  resultLimit?: number;
  indexName?: string;
  forceIndex?: boolean;
}

export interface IndexNameScore {
  name: string;
  score: number;
}
