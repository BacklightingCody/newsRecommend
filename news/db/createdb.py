import pymysql

# 配置数据库连接信息
db_config = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "root",
    "db": "news",
    "charset": "utf8mb4",
}


# 连接到MySQL数据库
connection = pymysql.connect(**db_config)
cursor = connection.cursor()

# 创建新闻表
create_table_query = """
CREATE TABLE IF NOT EXISTS news_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  time VARCHAR(255),
  source VARCHAR(255),
  content TEXT,
  link VARCHAR(255)
)
"""

try:
    cursor.execute(create_table_query)
    print("News table created successfully.")
except Exception as e:
    print(f"Error creating news table: {e}")

# 关闭数据库连接
cursor.close()
connection.close()
