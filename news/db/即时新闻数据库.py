import requests
from bs4 import BeautifulSoup
import pymysql
#位于数据库news_database中的news_table表中
# 配置数据库连接信息
db_config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'root',
    'db': 'news',
    'charset': 'utf8mb4'
}

# 连接到数据库
connection = pymysql.connect(
    host=db_config['host'],
    port=db_config['port'],
    user=db_config['user'],
    password=db_config['password'],
    db=db_config['db'],
    charset=db_config['charset']
)
cursor = connection.cursor()

for i in range(1, 3):
    base_url = f'https://www.chinanews.com.cn/scroll-news/news{i}.html'

    response = requests.get(base_url)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')

    news_list = soup.find_all('div', class_='dd_bt')
    news_times = soup.find_all('div', class_='dd_time')

    for news, times in zip(news_list, news_times):
        title_tag = news.find('a')
        time = times.text
        if title_tag:
            title = title_tag.text.strip()
            link = title_tag['href']
            article_url = f'https://www.chinanews.com.cn/{link}'
            
            try:
                response = requests.get(article_url)
                response.encoding = 'utf-8'
                article_soup = BeautifulSoup(response.text, 'html.parser')
                
                content_div = article_soup.find('div', class_='left_zw')
                if content_div:
                    news_text = content_div.text

                    # 插入数据到数据库
                    sql = "INSERT INTO news_table (title, time, content, link) VALUES (%s, %s, %s, %s)"
                    cursor.execute(sql, (title, time, news_text, article_url))
                    connection.commit()
                    print(f"News article '{title}' has been saved to the database.")
                else:
                    print(f"Could not find content for '{title}'.")
            except requests.RequestException as e:
                print(f"An error occurred while fetching or writing '{title}': {e}")
            except Exception as e:
                print(f"An unexpected error occurred: {e}")

# 关闭数据库连接
cursor.close()
connection.close()
