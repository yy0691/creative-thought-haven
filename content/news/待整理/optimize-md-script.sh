#!/bin/bash

# Markdown文档优化脚本
# 该脚本用于批量处理Markdown文档，实现文件重命名和Front Matter更新

# 源文件夹路径
SOURCE_DIR="/Volumes/JY/0 Projects/creative-thought-haven/content/news/待整理/output-md"

# 目标文件夹路径
TARGET_DIR="/Volumes/JY/0 Projects/creative-thought-haven/content/news/待整理/optimized-md"

# 创建目标文件夹（如果不存在）
mkdir -p "$TARGET_DIR"

# 处理文件列表
process_file() {
  local old_file="$1"
  local new_file="$2"
  local title="$3"
  local description="$4"
  local tags="$5"
  
  local old_path="$SOURCE_DIR/$old_file"
  local new_path="$TARGET_DIR/$new_file"
  
  if [ -f "$old_path" ]; then
    echo "处理文件: $old_file -> $new_file"
    
    # 复制文件到目标目录
    cp "$old_path" "$new_path"
    
    # 更新Front Matter
    sed -i '' "s/^title: .*/title: $title/" "$new_path"
    sed -i '' "s/^description: .*/description: $description/" "$new_path"
    sed -i '' "s/^tags: .*/tags: [$tags]/" "$new_path"
    
    echo "文件优化完成: $new_file"
  else
    echo "警告: 文件不存在: $old_file"
  fi
}

# 逐个处理指定的文件
process_file "2025-04-10-.md" "20250410-autoregressive-image-generation.md" "什么是自回归图像生成？" "本文介绍了自回归图像生成的概念、与扩散模型的区别、优势以及GPT-4o的生成过程和技术难点。" "自回归模型, 图像生成, GPT-4o, 扩散模型"
process_file "2025-04-10--2.md" "20250410-midjourney-lighting-techniques.md" "Midjourney摄影照明灯光技巧" "本教程详细介绍了Midjourney中的摄影照明灯光技巧，包括自然采光、工作室照明、艺术照明和特效灯光等多种照明类型及其应用场景和示例Prompt。" "Midjourney, 摄影技巧, 照明灯光, AI绘画"
process_file "2025-04-12-.md" "20250412-luma-ray2-camera-motion.md" "Luma Ray2相机运动概念功能详解" "本文介绍了Luma Labs推出的Ray2中的Camera Motion Concepts功能，包括20多种经过精确调整的摄像机运动，让AI视频也能拍出专业电影级镜头运动。" "Luma Ray2, 相机运动, AI视频, 电影镜头"
process_file "2025-04-14-.md" "20250414-qwen25-omni-multimodal-model.md" "阿里云发布Qwen2.5Omni端到端全模态感知与响应模型" "本文介绍了阿里云发布的Qwen2.5-Omni端到端全模态感知与响应模型，该模型支持看、听、说、写、做，能处理文本、图片、语音、视频等多种模态。" "Qwen2.5Omni, 多模态模型, 阿里云, 通义千问"
process_file "2025-04-15-.md" "20250415-quantum-computing-breakthrough.md" "量子计算的革命性突破" "本文介绍了Google DeepMind最新发布的量子计算研究成果，包括室温量子稳定性、错误校正和可扩展架构等关键突破。" "量子计算, Google DeepMind, 室温量子, 错误校正"
process_file "2025-04-12-prompt-engineering-frameworks.md" "20250412-prompt-engineering-frameworks.md" "9种高效的提示词框架模板" "本文介绍了9种高效的提示词框架模板，包括A.P.E、T.A.G、E.R.A、R.A.C.E、R.I.S.E等，可帮助用户更高效地使用AI生成内容。" "提示词工程, 框架模板, AI提示, A.P.E"
process_file "2025-04-16-deepchat-llm.md" "20250416-deepchat-llm.md" "DeepChat开源跨平台LLM聊天助手" "本文介绍了DeepChat开源跨平台桌面应用程序，该程序将多个强大的大语言模型和本地工具集成到一个易用、功能强大的智能聊天助手中。" "DeepChat, LLM, 开源应用, 跨平台"
process_file "2025-04-17-.md" "20250417-genspark-super-agent.md" "Genspark Super Agent多智能体混合系统" "本文介绍了Genspark推出的Super Agent自动化AI代理，该代理具备自主思考、规划、执行、调用工具的能力，使用了世界首个多智能体混合系统构建。" "Genspark, Super Agent, 多智能体, 自动化代理"
process_file "2025-04-18-.md" "20250418-anima-labs-camera-angles.md" "Anima Labs相机角度摄影教程" "本文介绍了Anima Labs提供的关于如何在图像提示中掌握不同相机角度的使用的教程，以增强摄影控制力和效果。" "Anima Labs, 相机角度, 摄影教程, AI绘画"

# 定义需要跳过的文件列表（已处理的文件）
skipped_files=("2025-04-10-.md" "2025-04-10--2.md" "2025-04-12-.md" "2025-04-14-.md" "2025-04-15-.md" "2025-04-12-prompt-engineering-frameworks.md" "2025-04-16-deepchat-llm.md" "2025-04-17-.md" "2025-04-18-.md")

# 检查是否需要跳过某个文件
should_skip() {
  local file="$1"
  for skip_file in "${skipped_files[@]}"; do
    if [ "$file" = "$skip_file" ]; then
      return 0  # 应该跳过
    fi
  done
  return 1  # 不应该跳过
}

# 处理剩余文件（这些文件需要手动检查内容并更新）
echo "\n以下文件需要手动处理:"
for file in "$SOURCE_DIR"/*.md; do
  filename=$(basename "$file")
  if ! should_skip "$filename"; then
    echo "- $filename"
    # 复制文件到目标目录，保持原文件名
    cp "$file" "$TARGET_DIR/$filename"
  fi
done

echo "\n所有文件处理完成。已优化的文件保存在: $TARGET_DIR"
echo "请手动检查剩余文件的内容，并根据 md文档优化建议.md 中的指南进行进一步优化。"