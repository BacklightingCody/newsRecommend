const { connectToDatabase } = require('../database/db_connection');
async function getData() {
    try {
        const db = await connectToDatabase();
        const userId = '84ff6c18-b1c0-4d57-8e20-c60145d7cb6b'
        const result = await db.collection('userInfo').findOne({userId})
        // console.log(result)
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
getData()