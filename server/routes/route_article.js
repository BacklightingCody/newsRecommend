//文章请求路由
// 引入 Express
const express = require('express');
const router = express.Router();
// 引入外部函数
const { db, getAllTables, getTableColumns, generateSelectQuery } = require('../api/search')
const { checkAndCreateHistoryTable } = require('../utils/database')

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
    checkAndCreateHistoryTable(db)
});

// 定义通用查询函数
const executeQuery = (tableName, res) => {
    try {
        // console.log(`Executing query for table: ${tableName}`);
        if (!res) {
            console.error('Response object is undefined');
            return;
        }

        const sql = `SELECT * FROM \`${tableName}\``;
        db.query(sql, (err, result) => {
            if (err) {
                console.error(`Error executing query for table ${tableName}:`, err);
                res.status(500).json({ error: '获取失败，请稍后重试' });
                return;
            }
            res.status(200).json(result);
        });
    } catch (error) {
        console.error(`处理请求时出错 for table ${tableName}:`, error);
        res.status(500).json({ error: '获取失败，请稍后重试' });
    }
};
// 获取所有新闻
router.get('/getnews', (req, res) => {
    executeQuery('news_table', res)
});


// 信息化新闻
router.get('/getBreaknews', (req, res) => {
    executeQuery('信息化', res);
});

// 时政新闻
router.get('/shizheng', (req, res) => {
    executeQuery('时政', res);
});

// 社会新闻
router.get('/society', (req, res) => {
    executeQuery('人居生活', res);
});

// 国际新闻
router.get('/international', (req, res) => {
    executeQuery('国际', res)
})
// 财经新闻
router.get('/economy', (req, res) => [
    executeQuery('财经', res)
])
// 科技新闻
router.get('/technology', (req, res) => {
    executeQuery('科技', res)
})
// 健康新闻
router.get('/health', (req, res) => {
    executeQuery('健康', res)
})

// 查找新闻
router.get('/:category/:id', (req, res) => {
    // console.log(req.params)
    const { category, id } = req.params;
    const sql = `SELECT * FROM \`${category}\` WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('查询文章内容失败:', err);
            res.status(500).json({ error: '获取文章内容失败，请稍后重试' });
            return;
        }

        if (result.length === 0) {
            res.status(404).json({ error: '文章未找到' });
            return;
        }
        // console.log(res)
        res.status(200).json(result[0]);
    });
});
// 搜索新闻

// 处理搜索请求的路由
router.get('/search', async (req, res) => {
    const searchText = req.query.keyword;
    console.log(searchText)

    if (!searchText) {
        return res.status(400).json({ error: '缺少搜索文本' });
    }
    try {
        const tables = await getAllTables();
        const allColumnsSet = new Set();
        const tableColumnsMap = {};

        // 获取所有表的列名
        for (const table of tables) {
            const columns = await getTableColumns(table);
            tableColumnsMap[table] = columns;
            columns.forEach(col => allColumnsSet.add(col));
        }

        const allColumns = Array.from(allColumnsSet);
        const queries = tables.map(table => {
            return generateSelectQuery(table, allColumns, tableColumnsMap[table], searchText);
        });

        const sql = queries.join(' UNION ALL ');
        db.query(sql, (err, result) => {
            if (err) {
                console.error('搜索失败:', err);
                return res.status(500).json({ error: '搜索失败，请稍后重试' });
            }
            console.log(result)
            res.status(200).json(result);
        });
    } catch (error) {
        console.error('处理搜索请求时出错:', error);
        res.status(500).json({ error: '搜索失败，请稍后重试' });
    }
});
// 存储历史记录的新闻
router.post('/artHistory', (req, res) => {
    const { userid, id, category, time, title } = req.body.article;
    const article_id = id
    const article_category = category
    const article_time = time
    const article_title = title
    const query = 'INSERT INTO history (userid,article_id, article_category,article_time ,article_title) VALUES (?,?, ?, ?, ?)';

    db.query(query, [userid,article_id, article_category, article_time, article_title], (error, results) => {
        if (error) {
            console.error('Error adding to history:', error);
            return res.status(500).send({ success: false, message: '添加失败' });
        }
        res.status(200).send({ success: true, message: '添加成功' });
    });
});
// 获取历史记录
router.get('/getHistory', (req, res) => {
    // 这里发现需要有用户的信息, 比如id什么的才能取到相关用户的
    const { userid } = req.query;
    const query = 'SELECT * FROM history WHERE userid = ?';

    db.query(query, [userid], (error, results) => {
        if (error) {
            console.error('Error fetching history:', error);
            return res.status(500).json({ error: '获取历史记录失败，请稍后重试' });
        }
        console.log(results)
        res.status(200).json(results);
    });
})
module.exports = router
