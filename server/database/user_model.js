const { connectToDatabase} = require('./db_connection');
// users数据结构
// {
//     "_id": ObjectId,
//     "username": String,
//     "password": String,
//     "phone": String,
//     "profile": {
//         "name": String,
//         "address": String,
//         "email": String,
//         "hobbies": [String]
//     }
// }
async function manipulateUser() {
    try {
        // 建立数据库连接
        const db = await connectToDatabase();
        console.log("Connected to MongoDB");
        // 使用 db 对象执行数据库操作
        const result = await db.collection('userData').findOne({ username: 'example' });
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

manipulateUser();