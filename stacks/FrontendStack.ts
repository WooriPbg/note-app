import * as sst from "@serverless-stack/resources";

export default class FrontendStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: any) {
    super(scope, id, props);

    const { api, auth, bucket } = props;

    // React App 정의
    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      // 환경변수 값 전달(주요 key값들)
      environment: {
        REACT_APP_API_URL: api.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_BUCKET: bucket.bucketName,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID: auth.cognitoUserPoolClient.userPoolClientId,
      },
    });

    // 사이트 주소 노출
    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}