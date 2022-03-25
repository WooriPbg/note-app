import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";

export default function main(app: sst.App): void {
  new StorageStack(app, "storage-pbg");
}
