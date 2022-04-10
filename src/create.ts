import * as uuid from "uuid";
import dynamoDb from "./util/dynamodb";
import handler from "./util/handler";

export const main = handler(async (event) => {
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
    await dynamoDb.put(params);

    return params.Item;
});