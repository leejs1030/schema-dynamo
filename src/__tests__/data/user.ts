import { numToUserObject, userCount } from '../util';

const tableName = 'schema.test.user';

const initializeArray = () => {
  const items = [];
  for (let i = 0; i < userCount; i++) {
    items.push(numToUserObject(i));
  }
  return items;
};

const items = initializeArray();

const user = { tableName, items };

export default user;
