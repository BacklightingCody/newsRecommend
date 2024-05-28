import requests
from bs4 import BeautifulSoup
import re
import pymysql


# 清洗文件名函数
def clean_filename(filename):
    cleaned_filename = re.sub(r'[\\/:*?"<>|]', "", filename)
    return cleaned_filename


# 数据库配置
db_config = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "root",
    "db": "news",
    "charset": "utf8mb4",
}

# 建立数据库连接
connection = pymysql.connect(
    host=db_config["host"],
    port=db_config["port"],
    user=db_config["user"],
    password=db_config["password"],
    db=db_config["db"],
    charset=db_config["charset"],
)

try:
    with connection.cursor() as cursor:
        base_url = "http://www.xinhuanet.com/"
        response = requests.get(base_url)
        response.encoding = "utf-8"
        soup = BeautifulSoup(response.text, "html.parser")

        # 获取新闻分类
        news_categories = soup.find("div", class_="nav right").find_all("a")

        # 遍历新闻分类
        for category in news_categories:
            category_title = category.text.strip()  # 获取分类标题
            category_link = category["href"]  # 获取分类链接

            # 拼接完整链接
            if not category_link.startswith("http"):
                full_category_link = f"http://www.news.cn/{category_link}"
            else:
                full_category_link = category_link

            # 请求分类页面
            category_response = requests.get(full_category_link)
            category_response.encoding = "utf-8"
            category_soup = BeautifulSoup(category_response.text, "html.parser")

            # 获取该分类下的新闻列表
            news_list = category_soup.find_all("div", class_="tit")

            # 遍历新闻列表
            for news in news_list:
                title_elem = news.find("a")
                if title_elem:
                    title = title_elem.text.strip()  # 获取新闻标题
                    link = title_elem["href"]  # 获取新闻链接

                    # 拼接完整链接
                    if not link.startswith("http"):
                        full_link = f"http://www.news.cn/{link}"
                    else:
                        full_link = link

                    # 插入新闻到数据库
                    try:
                        cursor.execute(
                            "INSERT INTO news (title, link, category) VALUES (%s, %s, %s)",
                            (title, full_link, category_title),
                        )
                        connection.commit()
                    except pymysql.MySQLError as e:
                        print(f"插入数据库出错: {e}")
except requests.RequestException as e:
    print(f"请求URL出错: {e}")
except pymysql.MySQLError as e:
    print(f"数据库连接出错: {e}")
finally:
    connection.close()
