import { DocumentConnection } from '../connection/document-connection';

export abstract class OrmBase {
  protected readonly TableName: string;
  protected readonly document: DocumentConnection;

  constructor(document: DocumentConnection, TableName: string) {
    this.document = document;
    this.TableName = TableName;
  }

  scan() {
    return this.document.scan({
      TableName: this.TableName,
    });
  }

  get() {
    return this.document.get({
      TableName: this.TableName,
      Key: {},
    });
  }

  query() {
    return this.document.query({
      TableName: this.TableName,
    });
  }

  put() {
    return this.document.put({
      TableName: this.TableName,
      Item: {},
    });
  }

  update() {
    return this.document.update({
      TableName: this.TableName,
      Key: {},
    });
  }

  delete() {
    return this.document.delete({
      TableName: this.TableName,
      Key: {},
    });
  }

  abstract batchGet();

  abstract batchWrite();

  abstract transactGet();

  abstract transactWrite();
}
