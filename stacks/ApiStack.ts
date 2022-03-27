import * as sst from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
    public api: sst.Api;

    constructor(scope: sst.App, id: string, props?: any) {
        super(scope, id, props);

        const { table } = props;

        this.api = new sst.Api(this, 'api-pbg', {
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName
                }
            },
            routes: {
                "POST /notes" : "src/create.main"
            }
        });

        // API가 DynamoDB 테이블에 접근할 수 있도록 권한 설정
        this.api.attachPermissions([table]);

        // API의 EndPoint Url을 노출
        this.addOutputs({
            ApiEndpoint: this.api.url
        });
    }
}