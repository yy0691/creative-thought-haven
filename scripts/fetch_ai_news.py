import requests
import json
import os
from datetime import datetime
import hashlib
import re
import feedparser
import html
from urllib.parse import urlparse

# 已推送的新闻记录文件
PUSHED_NEWS_FILE = 'pushed_news.json'

# RSS订阅源配置
RSS_SOURCES = [{
    "name": "DeepLearning.AI",
    "url": "https://rsshub.app/deeplearning/the-batch",
    "category": "AIGC"
}, {
    "name": "cncf",
    "url": "https://rsshub.app/cncf",
    "category": "科技"
}, {
    "name": "量子位",
    "url": "https://rsshub.app/wechat/ce/599d7c52f2145121d1aa4698",
    "category": "AIGC"
}, {
    "name": "机器之心",
    "url": "https://rsshub.app/wechat/ce/5b0cc833f3a2e44bb474843d",
    "category": "AIGC"
}]


def get_news_from_apis():
    """从多个API获取AI新闻"""
    news_list = []

    # 首先获取RSS源的新闻
    rss_news = get_news_from_rss()
    news_list.extend(rss_news)

    # 从其他API获取数据
    try:
        # 1. 从天行数据API获取AI新闻
        tianxing_api_key = os.environ.get('TIANXING_API_KEY')
        if tianxing_api_key:
            tianxing_url = f"https://api.tianapi.com/it/index?key={tianxing_api_key}&num=20"
            response = requests.get(tianxing_url)
            if response.status_code == 200:
                data = response.json()
                if data['code'] == 200:
                    for news in data['newslist']:
                        if any(keyword in news['title']
                               or keyword in news['description'] for keyword in
                               ['AI', '人工智能', '大模型', 'GPT', 'Claude', '深度学习']):
                            news_list.append({
                                'id':
                                hashlib.md5(news['url'].encode()).hexdigest(),
                                'title':
                                news['title'],
                                'description':
                                news['description'],
                                'author':
                                news['source'],
                                'date':
                                datetime.now().strftime('%Y-%m-%d'),
                                'image':
                                news['picUrl'],
                                'category':
                                get_category(news['title']),
                                'link':
                                news['url']
                            })

        # 2. 从36Kr API获取科技新闻
        kr_url = "https://36kr.com/api/search-colony/grid/search-distinct?page=1&per_page=20&sort=time&column_ids=&_format_=normal"
        headers = {
            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(kr_url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            for item in data['data']['items']:
                if any(keyword in item['title'] for keyword in
                       ['AI', '人工智能', '大模型', 'GPT', 'Claude', '深度学习']):
                    news_list.append({
                        'id':
                        hashlib.md5(item['route'].encode()).hexdigest(),
                        'title':
                        item['title'],
                        'description':
                        item['description']
                        if 'description' in item else item['summary'],
                        'author':
                        '36氪',
                        'date':
                        datetime.now().strftime('%Y-%m-%d'),
                        'image':
                        item['cover'] if 'cover' in item else '',
                        'category':
                        get_category(item['title']),
                        'link':
                        f"https://36kr.com{item['route']}"
                    })

    except Exception as e:
        print(f"获取API新闻出错: {e}")

    return news_list


def get_news_from_rss():
    """从RSS订阅源获取AI相关新闻"""
    news_list = []

    try:
        for source in RSS_SOURCES:
            print(f"正在从 {source['name']} 获取RSS新闻...")
            feed = feedparser.parse(source['url'])

            for entry in feed.entries[:10]:  # 获取每个源的前10条新闻
                # 提取标题和描述
                title = entry.title

                # 确保有相关的AI关键词
                if not any(keyword in title.lower() for keyword in [
                        'ai', 'artificial intelligence', '人工智能', '机器学习',
                        'machine learning', 'deep learning', '深度学习', 'llm',
                        'gpt', 'claude', '大模型', '大语言模型'
                ]):
                    continue

                # 提取描述，清理HTML标签
                description = ''
                if 'summary' in entry:
                    description = clean_html(entry.summary)
                elif 'description' in entry:
                    description = clean_html(entry.description)

                # 提取图片
                image_url = extract_image_from_entry(entry)

                # 提取日期
                date = datetime.now().strftime('%Y-%m-%d')
                if 'published' in entry:
                    try:
                        date_obj = datetime.strptime(
                            entry.published, '%a, %d %b %Y %H:%M:%S %Z')
                        date = date_obj.strftime('%Y-%m-%d')
                    except:
                        pass

                # 生成唯一ID
                news_id = hashlib.md5(entry.link.encode()).hexdigest()

                news_list.append({
                    'id':
                    news_id,
                    'title':
                    title,
                    'description':
                    description[:200] +
                    '...' if len(description) > 200 else description,
                    'author':
                    source['name'],
                    'date':
                    date,
                    'image':
                    image_url,
                    'category':
                    get_rss_category(title, source['category']),
                    'link':
                    entry.link
                })

            print(f"从 {source['name']} 获取了 {len(news_list)} 条新闻")

    except Exception as e:
        print(f"获取RSS新闻出错: {e}")

    return news_list


def clean_html(html_text):
    """清理HTML标签"""
    # 使用正则表达式移除HTML标签
    clean_text = re.sub(r'<.*?>', '', html_text)
    # 解码HTML实体
    clean_text = html.unescape(clean_text)
    # 移除多余空白
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()
    return clean_text


def extract_image_from_entry(entry):
    """从RSS条目中提取图片URL"""
    # 尝试从media_content中提取
    if 'media_content' in entry:
        for media in entry.media_content:
            if 'url' in media:
                return media['url']

    # 尝试从enclosures中提取
    if 'enclosures' in entry:
        for enclosure in entry.enclosures:
            if 'url' in enclosure and enclosure.get('type',
                                                    '').startswith('image/'):
                return enclosure['url']

    # 尝试从内容中提取
    if 'content' in entry:
        for content in entry.content:
            if 'value' in content:
                match = re.search(r'<img.*?src=[\'"]([^\'"]+)[\'"]',
                                  content['value'])
                if match:
                    return match.group(1)

    # 尝试从summary或description中提取
    content = entry.get('summary', '') or entry.get('description', '')
    match = re.search(r'<img.*?src=[\'"]([^\'"]+)[\'"]', content)
    if match:
        return match.group(1)

    # 使用默认图片
    return get_default_image_for_category(get_rss_category('', ''))


def get_default_image_for_category(category):
    """根据类别返回默认图片"""
    default_images = {
        'AIGC':
        'https://www.ihuayaoming.com/upload/20213/9c3a2e7e2a7c47fc88e76fbed41c5dab.jpg',
        '大模型':
        'https://pic.rmb.bdstatic.com/bjh/news/1d9599ae7559e5427c0d2a3c36029c3a.jpeg',
        '科技':
        'https://www.chinadaily.com.cn/china/images/attachement/jpg/site1/20170818/286ed488c10c1b12e40412.jpg',
        '硬件':
        'https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-horiz-500x200-2c50-p@2x.png',
        'AI安全':
        'https://img.zcool.cn/community/01de2f58bea187a801219c777fcf9f.jpg'
    }
    return default_images.get(
        category, 'https://static.xiaohucdn.com/blog/ai/default-news.jpg')


def get_rss_category(title, default_category):
    """根据标题和默认分类确定新闻类别"""
    if any(word in title
           for word in ['GPT', 'Claude', 'LLM', '大模型', '文心', '通义', '大语言模型']):
        return '大模型'
    elif any(word in title
             for word in ['芯片', 'GPU', '计算', 'NVIDIA', '英伟达', '华为', '服务器']):
        return '硬件'
    elif any(word in title for word in ['视觉', '图像', '识别', 'CV']):
        return '计算机视觉'
    elif any(word in title for word in ['安全', '隐私', '风险']):
        return 'AI安全'
    elif default_category == 'AIGC':
        return 'AIGC'
    else:
        return default_category


def get_category(title):
    """根据标题内容判断新闻类别"""
    if any(word in title
           for word in ['GPT', 'Claude', 'LLM', '大模型', '文心', '通义']):
        return '大模型'
    elif any(word in title
             for word in ['芯片', 'GPU', '计算', 'NVIDIA', '英伟达', '华为']):
        return '硬件'
    elif any(word in title for word in ['视觉', '图像', '识别']):
        return '计算机视觉'
    elif any(word in title for word in ['安全', '隐私']):
        return 'AI安全'
    else:
        return 'AI新闻'


def filter_news(news_list):
    """过滤已经推送过的新闻"""
    try:
        if os.path.exists(PUSHED_NEWS_FILE):
            with open(PUSHED_NEWS_FILE, 'r', encoding='utf-8') as f:
                pushed_news = json.load(f)
        else:
            pushed_news = []

        # 获取已推送的新闻ID
        pushed_ids = [news['id'] for news in pushed_news]

        # 过滤出未推送的新闻
        new_news = [news for news in news_list if news['id'] not in pushed_ids]

        # 更新已推送新闻记录
        if new_news:
            pushed_news.extend(new_news)
            with open(PUSHED_NEWS_FILE, 'w', encoding='utf-8') as f:
                json.dump(pushed_news, f, ensure_ascii=False, indent=2)

        return new_news

    except Exception as e:
        print(f"过滤新闻出错: {e}")
        return news_list


def update_news_ts(news_list):
    """更新news.ts文件"""
    news_ts_path = 'src/data/ai/news.ts'

    try:
        # 读取原始文件内容
        with open(news_ts_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 查找defaultNewsItems数组的开始和结束位置
        start_pattern = re.compile(
            r'export const defaultNewsItems: CardItem\[\] = \[')
        end_pattern = re.compile(r'\];')

        start_match = start_pattern.search(content)
        if not start_match:
            raise Exception("在news.ts中找不到defaultNewsItems数组")

        # 找到数组的结束位置
        start_pos = start_match.end()
        bracket_count = 1
        end_pos = start_pos

        while bracket_count > 0 and end_pos < len(content):
            if content[end_pos] == '[':
                bracket_count += 1
            elif content[end_pos] == ']':
                bracket_count -= 1
            end_pos += 1

        if bracket_count != 0:
            raise Exception("无法确定defaultNewsItems数组的结束位置")

        end_pos -= 1  # 调整到最后一个]之前

        # 提取现有的新闻数据
        existing_news_text = content[start_pos:end_pos]

        # 解析现有新闻数据来提取ID
        existing_ids = []
        id_pattern = re.compile(r"id: '([^']*)'")
        existing_matches = id_pattern.finditer(existing_news_text)
        for match in existing_matches:
            existing_ids.append(match.group(1))

        # 过滤掉已存在的新闻
        filtered_news = [
            news for news in news_list if news['id'] not in existing_ids
        ]

        if not filtered_news:
            print("没有新的新闻需要添加")
            return

        # 生成新的新闻数据文本
        new_news_text = ""
        for news in filtered_news:
            # 确保文本中的单引号被正确转义
            title = news['title'].replace("'", "\\'")
            description = news['description'].replace("'", "\\'")
            author = news['author'].replace("'", "\\'")

            new_news_text += f"""
  {{
    id: '{news['id']}',
    title: '{title}',
    description: '{description}',
    author: '{author}',
    date: '{news['date']}',
    image: '{news['image']}',
    category: '{news['category']}',
    link: '{news['link']}'
  }},"""

        # 将新的新闻数据插入到数组的开头
        new_content = content[:start_pos] + new_news_text + content[start_pos:]

        # 写入文件
        with open(news_ts_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"成功添加了 {len(filtered_news)} 条新闻")

    except Exception as e:
        print(f"更新news.ts文件出错: {e}")


def main():
    # 获取新闻
    news_list = get_news_from_apis()

    # 过滤已推送的新闻
    new_news = filter_news(news_list)

    # 更新news.ts文件
    if new_news:
        update_news_ts(new_news)
        print(f"成功获取并更新了 {len(new_news)} 条新闻")
    else:
        print("没有新的新闻需要更新")


if __name__ == "__main__":
    main()
