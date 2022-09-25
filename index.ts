import { GetSchema } from './src/schema/get/get-schema';
import { SchemaDynamo } from './src/libs/schema-dynamo/schema-dynamo';
import { Operator } from './src/typing/typing';

const AWS_REGION = 'local-env';
const AWS_ENDPOINT = 'http://localhost:8000';
const AWS_ACCES_KEY_ID = 'dyno00';
const AWS_SECRET_KEY = 'dyno00';

const getSchema = new GetSchema({
  endpoint: AWS_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCES_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

const main = async () => {
  const CatalogLogSchema = await getSchema.getSchema('test.cw.catalog.log');
  const schemaDynamo = new SchemaDynamo({
    endpoint: AWS_ENDPOINT,
    region: AWS_REGION,
    accessKeyId: AWS_ACCES_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
  });

  const CatalogLog = schemaDynamo.getObject(CatalogLogSchema);

  const x = await CatalogLog.findUnique({
    where: { owner: '627488dc72de653d5935822a', created: '2022-07-07T02:40:22' },
  });
  console.log(x);

  const keys = await CatalogLog.find({
    where: { [Operator.and]: [{ value: { [Operator.eq]: 1 } }] },
  });

  console.log(keys);
};

main();
