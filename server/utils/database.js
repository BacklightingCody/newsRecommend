// 检查并创建 history 表的函数
const checkAndCreateHistoryTable = (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userid VARCHAR(255) NOT NULL,
            article_id INT NOT NULL,
            article_category VARCHAR(255) NOT NULL,
            article_time DATETIME NOT NULL,
            article_title VARCHAR(255) NOT NULL
        );
    `;
    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating history table:', err);
        } else {
            console.log('History table ready');
        }
    });
};
module.exports = { checkAndCreateHistoryTable }