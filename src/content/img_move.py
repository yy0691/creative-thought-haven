import os
import re
import requests
from qiniu import Auth, put_file
from concurrent.futures import ThreadPoolExecutor

def download_github_image(github_url, save_path):
    """下载 GitHub 图片"""
    response = requests.get(github_url)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
        return True
    return False

def upload_to_qiniu(local_path, key):
    """上传到七牛云"""
    q = Auth("z1so5zrpKNdvDDakSVd0xdroYI6oaGEVL64Wvo0x", "BhiMbxcNyqKAVPmMxtrNAiJuvFd5S18aRHaixQ52")
    token = q.upload_token("blog-img-luoyuan", key)
    ret, info = put_file(token, key, local_path)
    if ret:
        return f"{"st75yeaid.hb-bkt.clouddn.com"}/{key}"
    return None

def process_mdx_file(file_path):
    """处理单个 MDX 文件"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 匹配图片链接
    pattern = r'!\[.*?\]\((https://raw\.githubusercontent\.com/.*?)\)'
    
    def replace_url(match):
        github_url = match.group(1)
        filename = github_url.split('/')[-1]
        temp_path = f"temp/{filename}"
        
        # 下载并上传
        if download_github_image(github_url, temp_path):
            qiniu_url = upload_to_qiniu(temp_path, filename)
            if qiniu_url:
                return f"![](${qiniu_url})"
        return match.group(0)
    
    new_content = re.sub(pattern, replace_url, content)
    
    # 保存修改后的文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)