// 连接数据库
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:root@newsrecommend.lsdqsnc.mongodb.net/?retryWrites=true&w=majority&appName=newsRecommend";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        // 连接客户端到服务器（v4.7 可选）
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("news").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        return client.db("news");
    } catch (error) {
        console.error('连接数据库时出错:', error);
        throw error;
    }
}
connectToDatabase()
module.exports = { connectToDatabase};
