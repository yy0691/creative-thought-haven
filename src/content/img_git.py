import os
import re
import subprocess
import urllib.parse

# 需要递归处理所有 Markdown 文件的根目录
MD_ROOT = r"F:\Blog2025\creative-thought-haven\src\content\网络安全"

# 如果你的 Markdown 有 "/src/content/..." 这种“绝对”路径，
# 你需要指定 PROJECT_ROOT，用来拼接。例如：
PROJECT_ROOT = r"F:\Blog2025\creative-thought-haven"

# 正则 1：匹配 Markdown 图片语法：![](...)
md_img_pattern = re.compile(r"!\[.*?\]\((.*?)\)")
# 正则 2：匹配自定义标签 <CenteredImage src="..." />
centered_img_pattern = re.compile(r'<CenteredImage.*?src="(.*?)".*?>')

def upload_image(local_path):
    """
    调用 PicGo 上传图片，并返回图床 URL（如果成功）。
    如果 PicGo 返回多行，只要其中一行以 http 开头，就视为上传成功。
    """
    abs_path = os.path.abspath(local_path)
    if not os.path.isfile(abs_path):
        print(f"❌ 无效图片路径，跳过：{abs_path}")
        return None

    print(f"📤 上传图片: {abs_path}")
    # 请根据你的 PicGo 安装位置修改下面的命令
    result = subprocess.run(
        [r"C:\Users\q\AppData\Roaming\npm\picgo.cmd", "upload", abs_path],
        capture_output=True, text=True
    )
    output = result.stdout.strip()
    print("📜 PicGo 输出:")
    print(output)

    # PicGo 可能输出多行，尝试寻找以 "http" 开头的行作为 URL
    for line in output.splitlines():
        line = line.strip()
        if line.startswith("http"):
            print(f"✅ 上传成功，提取 URL: {line}")
            return line

    print(f"❌ 上传失败: {output}")
    return None

def resolve_image_path(md_file_path, image_ref):
    """
    根据 Markdown 文件所在目录 + 图片引用，推算本地图片的绝对路径。
    支持两种写法：
      1. 相对路径（不以 '/' 开头），例如 "PDF编辑工具/Untitled%201.png"
         → 拼接成  <md_file_path所在目录> / PDF编辑工具 / Untitled 1.png
      2. 以 '/' 开头（从项目根开始），例如 "/src/content/WINDOWS_USE_Sub/WIN10重装系统/Untitled.png"
         → 拼接成  PROJECT_ROOT / src/content/WINDOWS_USE_Sub/WIN10重装系统/Untitled.png
    """

    # 先做 URL 解码，把 "Untitled%201.png" 变成 "Untitled 1.png"
    decoded = urllib.parse.unquote(image_ref)

    if decoded.startswith("/"):
        # 视为绝对路径：PROJECT_ROOT + decoded
        local_path = os.path.join(PROJECT_ROOT, decoded.lstrip("/\\"))
    else:
        # 视为相对路径：md_file 所在目录 + decoded
        md_dir = os.path.dirname(md_file_path)
        local_path = os.path.join(md_dir, decoded)

    return local_path

def replace_md_img(match, md_file_path):
    """回调函数：处理 ![](...)"""
    original_ref = match.group(1)  # 括号里的内容
    if original_ref.startswith("http"):
        return match.group(0)  # 已经是网络图片

    local_img_path = resolve_image_path(md_file_path, original_ref)
    new_url = upload_image(local_img_path)
    if new_url:
        print(f"✅ 替换成功: {original_ref} → {new_url}")
        return f"![]({new_url})"
    else:
        print(f"❌ 替换失败: {original_ref}")
        return match.group(0)

def replace_centered_img(match, md_file_path):
    """回调函数：处理 <CenteredImage src="..." />"""
    original_ref = match.group(1)  # src="xxx" 中的 xxx
    if original_ref.startswith("http"):
        return match.group(0)

    local_img_path = resolve_image_path(md_file_path, original_ref)
    new_url = upload_image(local_img_path)
    if new_url:
        print(f"✅ 替换成功: {original_ref} → {new_url}")
        old_tag = match.group(0)
        # 只替换 src="..." 里面的内容
        new_tag = old_tag.replace(f'src="{original_ref}"', f'src="{new_url}"')
        return new_tag
    else:
        print(f"❌ 替换失败: {original_ref}")
        return match.group(0)

def process_markdown(md_file_path):
    """处理单个 Markdown 文件：匹配并替换两种图片写法"""
    with open(md_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 先处理 ![](...) 语法
    new_content = md_img_pattern.sub(lambda m: replace_md_img(m, md_file_path), content)
    # 再处理 <CenteredImage ... src="..." />
    new_content = centered_img_pattern.sub(lambda m: replace_centered_img(m, md_file_path), new_content)

    if new_content != content:
        with open(md_file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"📄 更新 Markdown 文件: {md_file_path}")
    else:
        print(f"ℹ️ 文件未修改: {md_file_path}")

def main():
    # 递归遍历 MD_ROOT 下所有子目录，处理所有 .md 文件
    for root, dirs, files in os.walk(MD_ROOT):
        for filename in files:
            if filename.lower().endswith(".md"):
                md_file_path = os.path.join(root, filename)
                process_markdown(md_file_path)

if __name__ == "__main__":
    main()
    print("🎉 批量上传 & 替换完成！")
