import { GetSchema } from './src/schema/get/get-schema';

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

getSchema.getSchema('test.cw.catalog.log').then(console.log);
