// 连接数据库
const { MongoClient } = require('mongodb');
// 本地 MongoDB 的连接字符串
const uri = "mongodb://localhost:27017";

// Create a MongoClient
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        // 连接客户端到本地 MongoDB
        await client.connect();
        console.log("成功连接到本地 MongoDB！");

        return client.db(); // 无需传递数据库名称，使用默认数据库
    } catch (error) {
        console.error('连接数据库时出错:', error);
        throw error;
    }
}
// connectToDatabase()
module.exports = { connectToDatabase };
