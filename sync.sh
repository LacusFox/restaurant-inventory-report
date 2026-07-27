#!/bin/bash
# 一键同步 HTML 到 GitHub (lacusfox/restaurant-inventory-report)
# 用法:
#   ./sync.sh                      提交并推送当前仓库里的所有改动
#   ./sync.sh "更新了工资表页面"      带自定义提交说明
#   ./sync.sh ~/Desktop/a.html      先把指定文件复制进仓库,再提交推送(可多个)

set -e
export PATH="$HOME/.local/bin:$PATH"

REPO_DIR="/Users/sisi.hu/restaurant-inventory-report"
cd "$REPO_DIR"

MSG=""
# 处理参数:是文件就复制进来,否则当作提交说明
for arg in "$@"; do
  if [ -f "$arg" ]; then
    cp "$arg" "$REPO_DIR"/
    echo "已复制进仓库: $(basename "$arg")"
  else
    MSG="$arg"
  fi
done

# 没有任何改动就退出
if [ -z "$(git status --porcelain)" ]; then
  echo "没有需要同步的改动。"
  exit 0
fi

# 默认提交说明带时间戳
if [ -z "$MSG" ]; then
  MSG="更新 HTML $(date '+%Y-%m-%d %H:%M')"
fi

git add -A
git commit -m "$MSG"
git push origin main

echo ""
echo "✅ 已同步到 GitHub:https://github.com/lacusfox/restaurant-inventory-report"
