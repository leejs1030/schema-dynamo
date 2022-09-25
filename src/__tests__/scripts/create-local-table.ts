import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import { localDb } from './dynamo-local';

export const createLocalTable = (a: CreateTableInput) => localDb.createTable(a);
