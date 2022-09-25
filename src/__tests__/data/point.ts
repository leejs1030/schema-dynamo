import { numToPointObject, pointCount } from '../util';

const tableName = 'schema.test.point';

const initializeArray = () => {
  const items = [];
  for (let i = 0; i < pointCount; i++) {
    items.push(numToPointObject(i));
  }
  return items;
};

const items = initializeArray();

const user = { tableName, items };

export default user;
