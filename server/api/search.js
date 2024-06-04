const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'news'
});
// 获取所有表名
const getAllTables = async () => {
    return new Promise((resolve, reject) => {
        const sql = "SHOW TABLES";
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            const tables = result.map(row => Object.values(row)[0]);
            resolve(tables);
        });
    });
};

// 获取表结构
const getTableColumns = async (table) => {
    return new Promise((resolve, reject) => {
        const sql = `SHOW COLUMNS FROM \`${table}\``;
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            const columns = result.map(row => row.Field);
            resolve(columns);
        });
    });
};

// 生成标准化的 SELECT 语句
const generateSelectQuery = (table, allColumns, columns, searchText) => {
    const selectColumns = allColumns.map(col => {
        return columns.includes(col) ? `\`${col}\`` : `NULL AS \`${col}\``;
    }).join(', ');
    return `SELECT '${table}' AS table_name, ${selectColumns} FROM \`${table}\` WHERE title LIKE '%${searchText}%'`;
};
module.exports = { db, getAllTables, getTableColumns, generateSelectQuery }