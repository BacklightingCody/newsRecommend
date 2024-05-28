import pymysql
import sys

# 设置输出编码为UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# 数据库连接配置
db_config = {
    'host': '192.168.58.13',  # Change this to your MySQL server's hostname or IP address
    'port': 3306,
    'user': 'SYC',
    'password': 'APTX--4869',
    'db': 'news_database',
    'charset': 'utf8mb4'
}

# 创建数据库连接
connection = pymysql.connect(
    host=db_config['host'],
    port=db_config['port'],
    user=db_config['user'],
    password=db_config['password'],
    db=db_config['db'],
    charset=db_config['charset']
)

# 创建游标对象
cursor = connection.cursor()

# 执行查询或操作
cursor.execute("SELECT * FROM news_table")

# 获取查询结果
results = cursor.fetchall()
for row in results:
    try:
        print(row)
    except UnicodeEncodeError:
        print("UnicodeEncodeError: Unable to print row due to encoding issue")

# 关闭游标和连接
cursor.close()
connection.close()
