import dynamoDb from "./util/dynamodb";
import handler from "./util/handler";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME!,
        // 'Key' 수정하기 위해 수정해야 할 데이터의 Key를 정의
        Key: {
            userId: '123', // userID
            noteId: event.pathParameters.id // noteID
        },
        // 'UpdateExpression' 업데이트 할 필드 정의
        // 'ExpressionAttributeValues' 업데이트할 값을 정의
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':attachment': data.attachment || null, // 수정할 파일이름
            ':content': data.content || null, // 수정할 메모 내용
        },
        // 'ReturnValues' 이 설정에 따라 업데이트된 후 어떤 값을 돌려줄 지 설정가능
        ReturnValues: 'ALL_NEW'
    };
    
    await dynamoDb.update(params);

    return { status: true };
});