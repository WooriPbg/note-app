import dynamoDb from "./util/dynamodb";
import handler from "./util/handler";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME!,
        // 'Key' 삭제할 데이터의 키값 정의
        Key: {
            userId: '123', // userID
            noteId: event.pathParameters.id, // noteID
        }
    };

    await dynamoDb.delete(params);

    return { status: true };
});