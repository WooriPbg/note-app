import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: any) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.TABLE_NAME!,
        Item: {
            userId: '123', // 사용자 ID
            noteId: uuid.v1(), // 메모를 생성할 때 생성되는 고유 ID
            content: data.content, // event.body 쪽에서 받은 정보
            attachment: data.attachment, // event.body 쪽에서 받은 정보
            createdAt: Date.now() // 생성된 시간
        }
    };

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        }
    } catch (e: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message})
        };
    }
}