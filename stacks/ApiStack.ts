import * as sst from "@serverless-stack/resources";
import { ApiAuthorizationType } from "@serverless-stack/resources";

export default class ApiStack extends sst.Stack {
    public api: sst.Api;

    constructor(scope: sst.App, id: string, props?: any) {
        super(scope, id, props);

        const { table } = props;

        this.api = new sst.Api(this, 'api-pbg', {
            defaultAuthorizationType: ApiAuthorizationType.AWS_IAM,
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName
                }
            },
            routes: {
                'POST /notes': 'src/create.main', // 메모 생성 API
                'GET /notes/{id}': 'src/get.main', // 메모 조회 API
                'GET /notes': 'src/list.main', // 메모 목록 조회 API
                'PUT /notes/{id}': 'src/update.main', // 메모 수정 API
                'DELETE /notes/{id}': 'src/delete.main', // 메모 삭제 API
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