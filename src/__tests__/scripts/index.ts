import { createLocalTable } from './create-local-table';
import { PointSchema } from '../schema/schema.test.point';
import { UserSchema } from '../schema/schema.test.user';
import { deleteLocalTable } from './delete-local-table';

import user from '../data/user';
import point from '../data/point';
import { batchWrite } from './batch-write';

const schemaList = [PointSchema, UserSchema];

const dataList = [user, point];

const deleteExistingTable = () => {
  const deleteArr = schemaList.map(({ TableName }) => deleteLocalTable(TableName));
  return Promise.all(deleteArr);
};

const createNewTable = () => {
  const createArr = schemaList.map((schema) => createLocalTable(schema));
  return Promise.all(createArr);
};

const batchPutMapper = (arr) => {
  return arr.map((item) => ({ PutRequest: { Item: item } }));
};

const insertData = () => {
  const insertArr = dataList.map(({ tableName, items }) =>
    batchWrite(tableName, batchPutMapper(items)),
  );
  return Promise.all(insertArr);
};

const main = async () => {
  await deleteExistingTable();
  await createNewTable();
  await insertData();
};

// noinspection JSIgnoredPromiseFromCall
main();
