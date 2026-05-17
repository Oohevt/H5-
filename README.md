# H5 Share

这是一个固定的 GitHub Pages H5 分享仓库，用来收纳、管理、发布 AI 生成的单文件 HTML 页面。

它适合保存：

- 项目介绍页
- 产品方案页
- 临时 Demo
- 汇报页
- 报价说明
- 研究报告
- 可视化说明文档
- 小型交互工具
- AI 生成的单文件 HTML 页面

## 推荐结构

```text
h5-share/
  index.html
  data/
    pages.json
  pages/
    html-effectiveness-project-intro.html
  assets/
    images/
    css/
    js/
  scripts/
    add-page.mjs
  README.md
  .nojekyll
```

## 访问方式

当前仓库：

```text
https://github.com/Oohevt/H5-
```

GitHub Pages 发布后访问地址：

```text
https://oohevt.github.io/H5-/
https://oohevt.github.io/H5-/pages/html-effectiveness-project-intro.html
```

## 新增页面规范

- 文件名使用英文小写、数字和连字符，例如 `product-report-2026-05-17.html`。
- 页面文件放在 `pages/` 目录。
- 每个页面尽量是自包含的单文件 HTML。
- 公共图片可以放在 `assets/images/`。
- 新增页面后必须同步更新 `data/pages.json`。
- 页面标题、描述、分类、标签、创建日期和更新时间要写清楚。
- 不要提交敏感内容。

## 一键新增页面

准备好一个 HTML 文件后运行：

```bash
node scripts/add-page.mjs \
  --source ./draft.html \
  --file html-effectiveness-project-intro.html \
  --title "HTML 好用到难以置信项目介绍" \
  --description "介绍 html-effectiveness 项目是什么以及怎么用" \
  --category "AI 输出格式" \
  --tags "H5 文档,单文件 HTML,参考项目"
```

脚本会：

1. 把 HTML 文件复制到 `pages/`
2. 更新 `data/pages.json`
3. 提示本地预览、提交和推送命令

## 本地预览

```bash
python3 -m http.server 8080
```

然后打开：

```text
http://127.0.0.1:8080/
```

## GitHub Pages 设置步骤

1. 打开 GitHub 仓库 `https://github.com/Oohevt/H5-`。
2. 确认本地仓库已经推送到 GitHub。
3. 进入仓库 `Settings`。
4. 打开 `Pages`。
5. `Source` 选择 `Deploy from a branch`。
6. `Branch` 选择 `main`，目录选择 `/(root)`。
7. 保存后等待 GitHub Pages 发布。

GitHub Free 通常需要公开仓库才能使用 Pages。私有仓库 Pages 通常需要 GitHub Pro、Team、Enterprise Cloud 或 Enterprise Server。

## 安全注意事项

这个仓库如果发布到 GitHub Pages，页面会成为公网可访问内容。

不要放：

- 客户机密
- API Key
- 账号密码
- 内部系统地址
- 未公开商业资料
- 任何不适合公开传播的个人或公司信息

如果内容敏感，应改用私有托管、带鉴权的内部系统，或支持私有 Pages 的付费方案。

## 后续使用方式

每次需要新的 H5 页面时：

1. 根据需求生成一个单文件 `.html`
2. 用清晰英文文件名保存
3. 运行 `scripts/add-page.mjs`
4. 本地预览确认
5. 提交并推送到 GitHub
6. 返回最终公网访问链接
