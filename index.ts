import { GetSchema } from './src/schema/get/get-schema';
import { Orm } from './src/libs/orm/orm';
import { DbConnection } from './src/connection/db-connection';
import { DocumentConnection } from './src/connection/document-connection';

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

const db = new DbConnection({
  endpoint: AWS_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCES_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

const doc = new DocumentConnection({
  endpoint: AWS_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCES_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

const main = async () => {
  const CatalogLogSchema = await getSchema.getSchema('test.cw.catalog.log');
  const CatalogLog = new Orm(CatalogLogSchema, db, doc);

  const x = await CatalogLog.findUnique({
    where: { owner: '627488dc72de653d5935822a', created: '2022-07-07T02:40:22' },
  });
  console.log(x);
};

main();
