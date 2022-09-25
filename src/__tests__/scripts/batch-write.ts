import { localDocument } from './dynamo-local';

export const batchWrite = (TableName: string, items: any[]) => {
  const term = 25;
  let cur = 0;
  const len = items.length;
  const promiseArr = [];
  while (cur + term <= len) {
    promiseArr.push(
      localDocument.batchWrite({
        RequestItems: { [TableName]: items.slice(cur, cur + term) },
      }),
    );
    cur += term;
  }
  if (cur < len)
    promiseArr.push(
      localDocument.batchWrite({
        RequestItems: { [TableName]: items.slice(cur) },
      }),
    );
  return Promise.all(promiseArr);
};
