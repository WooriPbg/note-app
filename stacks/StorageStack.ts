import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
    public table: sst.Table;
    public buket: sst.Bucket;

    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
        super(scope, id, props);

        this.table = new sst.Table(this, "notes-pbg", {
            dynamodbTable: {
                tableName: 'nonets-pbg'
            },
            fields: {
                userId: sst.TableFieldType.STRING,
                noteId: sst.TableFieldType.STRING
            },
            primaryIndex: {
                partitionKey: 'userId',
                sortKey: 'noteId' 
            }
        });

        // S3Bucket 생성
        this.buket = new sst.Bucket(this, 'Uploads');
    }
}