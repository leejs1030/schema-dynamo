import { localDb } from './dynamo-local';

export const deleteLocalTable = async (TableName: string) => localDb.deleteTable({ TableName });
