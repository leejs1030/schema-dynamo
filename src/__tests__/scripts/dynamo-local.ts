import { DocumentConnection } from '../../connection/document-connection';
import { DbConnection } from '../../connection/db-connection';

const AWS_REGION = 'local-env';
const AWS_ENDPOINT = 'http://localhost:8000';
const AWS_ACCES_KEY_ID = 'dyno00';
const AWS_SECRET_KEY = 'dyno00';
export const localDocument = new DocumentConnection({
  endpoint: AWS_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCES_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

export const localDb = new DbConnection({
  endpoint: AWS_ENDPOINT,
  region: AWS_REGION,
  accessKeyId: AWS_ACCES_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
});
