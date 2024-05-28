import requests
from bs4 import BeautifulSoup
import re
import pymysql

# 清洗文件名函数
def clean_filename(filename):
    cleaned_filename = re.sub(r'[\\\\\\\\/:*?"<>|]', '', filename)
    return cleaned_filename
# 连接数据库
db_config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'root',
    'db': 'news',
    'charset': 'utf8mb4'
}

# 建立连接
connection = pymysql.connect(
    host=db_config['host'],
    port=db_config['port'],
    user=db_config['user'],
    password=db_config['password'],
    db=db_config['db'],
    charset=db_config['charset']
)

# 创建游标对象
with connection.cursor() as cursor:

    base_url = 'http://www.xinhuanet.com/'
    response = requests.get(base_url)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')

    # 获取新闻分类
    news_categories = soup.find('div', class_='nav right').find_all('a')

    # 循环遍历新闻分类
    for category in news_categories:
        category_title = category.text.strip()  # 获取分类标题
        category_link = category['href']  # 获取分类链接
        
        # 拼接完整链接
        if category_link.startswith('http'):
            full_category_link = category_link
        else:
            full_category_link = f'http://www.news.cn/{category_link}'
            
        # 请求分类页面
        response = requests.get(full_category_link)
        response.encoding = 'utf-8'
        category_soup = BeautifulSoup(response.text, 'html.parser')
        
        # 获取该分类下的新闻列表
        news_list = category_soup.find_all('div', class_='tit')
        
        # 循环遍历新闻列表
        for news in news_list:
            title_elem = news.find('a')
            if title_elem:
                title = title_elem.text.strip()  # 获取新闻标题
                link_elem = news.find('a')
                if link_elem:
                    link = link_elem['href']  # 获取新闻链接
                    
                    # 拼接完整链接
                    if link.startswith('http'):
                        full_link = link
                    else:
                        full_link = f'{base_url}{link}'
                        
                    # 请求新闻页面
                    response = requests.get(full_link)
                    response.encoding = 'utf-8'
                    article_soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # 获取新闻内容和时间
                    content = article_soup.find('span', id='detailContent')
                    time_elem = article_soup.find('div', class_='header-time left')
                    
                    if content and time_elem:
                        time = time_elem.text.strip()  # 获取新闻发布时间
                        paragraphs = content.text.strip()  # 获取新闻内容
                        filename = f'{clean_filename(category_title)}_{clean_filename(title)}.txt'  # 生成文件名
                        
                        # 创建表名
                        table_name = clean_filename(category_title)
                        
                        # 创建表
                        create_table_query = f"""
                        CREATE TABLE IF NOT EXISTS {table_name} (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            title VARCHAR(255) NOT NULL,
                            content TEXT NOT NULL,
                            time VARCHAR(50),
                            link VARCHAR(255)
                        )
                        """
                        cursor.execute(create_table_query)
                        
                        # 插入数据
                        try:
                            sql = f"INSERT INTO {table_name}(title, content, time, link) VALUES (%s, %s, %s, %s)"
                            cursor.execute(sql, (title, paragraphs, time, full_link))
                            connection.commit()
                            print(f'{category_title} - {title} 已写入数据库')
                        except Exception as e:
                            print(f"写入数据库时发生错误: {e}")
                    else:
                        print(f'在分类 {category_title} 中找不到新闻 {title} 的内容或时间信息')
                else:
                    print(f'在分类 {category_title} 中找不到新闻 {title} 的链接')
            else:
                print(f'在分类 {category_title} 中找不到新闻标题')

# 关闭连接
connection.close()
