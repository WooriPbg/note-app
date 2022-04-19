import * as sst from "@serverless-stack/resources";
import { HttpMethods } from 'aws-cdk-lib/aws-s3';

export default class StorageStack extends sst.Stack {
    public table: sst.Table;
    public buket: sst.Bucket;

    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
        super(scope, id, props);

        this.table = new sst.Table(this, "notes-pbg", {
            dynamodbTable: {
                tableName: 'notes-pbg'
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
        this.buket = new sst.Bucket(this, 'Uploads', {
            s3Bucket: {
                cors: [
                    {
                        maxAge: 3000,
                        allowedOrigins: ['*'],
                        allowedHeaders: ['*'],
                        allowedMethods: [
                            HttpMethods.GET,
                            HttpMethods.POST,
                            HttpMethods.PUT,
                            HttpMethods.DELETE,
                            HttpMethods.HEAD
                        ]
                    }
                ]
            }
        });
    }
}