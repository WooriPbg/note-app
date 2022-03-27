import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";

export default function main(app: sst.App): void {
  const storageStack = new StorageStack(app, "storage-pbg");

  new ApiStack(app, 'api-pbg', {
    table: storageStack.table
  });
}
