import dynamoDb from "./util/dynamodb";
import handler from "./util/handler";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME!,
        // DyanomDB에서 primaryKey, sortKey 2개가 제공되어야 한다.
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // primaryKey (UserID)
            noteId: event.pathParameters.id // sortKey (noteID)
        }
    };

    const result = await dynamoDb.get(params);
    if (!result.Item) {
        // 조회 실패
        throw new Error('Item not found.');
    };

    // 조회한 결과를 돌려준다.
    return result.Item;
});