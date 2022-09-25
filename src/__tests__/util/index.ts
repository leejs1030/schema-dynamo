// common
export const numToString = (num: number, len = 5) => {
  const str = num.toString();
  if (str.length > len) throw new Error();
  return str.padStart(len, '0');
};

// for user table
export const userCount = 100;
export const numToUserId = (num: number) => `userId${numToString(num)}`;
export const numToNickname = (num: number) => `nickname${numToString(num)}`;
export const numToCountry = (num: number) => (num % 10 === 0 ? 'US' : 'KR');
export const numToUserObject = (num: number) => ({
  userId: numToUserId(num),
  nickname: numToNickname(num),
  country: numToCountry(num),
});

// for point table
export const pointCount = 1000;

export const numToDate = (num: number) => {
  const month = numToString((((num + 1) * 27) % 12) + 1, 2);
  const date = numToString(((num * 27) % 30) + 1, 2);
  const hour = numToString(num % 24, 2);
  const minute = numToString(num % 59, 2);
  return new Date(`2022-${month}-${date}T${hour}:${minute}:00.000Z`);
};

export const numToCreatedAt = (num: number) => numToDate(num).toISOString();

const type = ['type01', 'type02', 'type03', 'type04'];
export const numToType = (num: number) => type[num];
export const numToTypeId = (num: number) => {
  const currentType = numToType(num);
  const currentDate = numToDate(num);
  return `${currentType}.${currentDate.getTime()}`;
};

export const numToPoint = (num: number) => (((num + 7) * 23) % 100) * 10000;

export const numToPointObject = (num: number) => ({
  userId: numToUserId(num % userCount),
  createdAt: numToCreatedAt(num),
  type: numToType(num),
  typeId: numToTypeId(num),
  point: numToPoint(num),
});
