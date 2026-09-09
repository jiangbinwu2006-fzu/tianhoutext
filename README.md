# 妈祖天后灵签问事

以泉州天后宫妈祖信仰为蓝本，还原「问事 → 掷杯 → 抽签 → 验签 → 解签」全流程的移动端民俗文化体验。项目收录 60 支妈祖天后灵签，签诗、干支、传统签意与典故均可离线使用；接入 DeepSeek 后可以获得结合个人所问生成的 AI 解签。

## 特性

- 完整还原庙宇问事流程：问事、掷杯允准、摇签、掷杯验签、签纸、解签
- 内置 60 支天后灵签：签诗、干支、卦象、传统签意、古人典故
- 未配置 API Key 时也可完成全部流程，使用签文传统释义自动生成解签
- 可选 DeepSeek AI 解签，结合香客具体所问给出温厚建议
- 移动端竖屏优先，桌面浏览器同样可用
- 深蓝海色天后宫氛围，包含天后檐脊、浪纹、渔舟与红金仪式配色
- API Key 只存服务端，不进入前端代码或 Git

## 在线体验

暂未部署，可先通过下方本地方式预览。仓库内的 GitHub Actions 已配置 Cloudflare Pages 自动部署，配置好 Secrets 并推送到 `main` 后会生成在线地址。

## 快速开始

需要 Node.js 18 以上版本。

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000` 即可体验完整流程。

如果只需要预览前端，而不需要 Cloudflare Functions：

```bash
npm run dev
```

如需体验含后端 Functions 的本地预览：

```bash
npm run build
npx wrangler pages dev dist
```

## 使用 AI 解签

AI 解签为可选功能。不配置时，页面会自动使用内置签意解签。

复制环境变量模板：

```bash
cp .env.example .dev.vars
```

编辑 `.dev.vars`：

```dotenv
DEEPSEEK_API_KEY=你的密钥
DEEPSEEK_MODEL=deepseek-chat
```

`DEEPSEEK_API_KEY` 只存在服务端环境，绝不进入前端代码或提交到 Git。

## 使用流程

1. 首页点击「诚心求问」。
2. 在心中默念姓名、生辰和所求之事，并填写所问内容。
3. 掷杯请示妈祖是否允准赐签。
4. 允准后点击签筒，摇出天后灵签。
5. 再次掷杯验签，确认是否为神明所赐之签。
6. 打开签纸，查看第几签、干支、签诗与典故，再点击「请天后解签」。

## 数据说明

`src/data/mazu_lots.json` 包含 60 支天后灵签：

| 字段 | 说明 |
| --- | --- |
| `id` | 签号，1–60 |
| `hexagram` | 甲子、乙丑等干支 |
| `omen` | 圆点卦象 |
| `poem_lines` | 四句签诗 |
| `interpretation` | 白话签意 |
| `meaning` | 传统分类断语 |
| `stories` | 签诗典故 |

签诗与解签内容来自公开民俗资料整理，用于个人学习与传统文化展示。

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Cloudflare Pages Functions
- DeepSeek API

## 项目结构

```text
├── src/
│   ├── App.tsx                # 流程状态控制
│   ├── components/            # 问事、掷杯、摇签、签纸、解签界面
│   ├── data/
│   │   └── mazu_lots.json     # 60 支天后灵签数据
│   ├── utils/
│   │   ├── lots.ts            # 签库读取与随机抽签
│   │   └── interpret.ts       # AI/本地解签调用
│   └── index.css              # 天后宫海色主题样式
├── functions/api/
│   └── interpret.ts           # Cloudflare Pages Function
├── .github/workflows/
│   └── deploy.yml             # Cloudflare Pages 自动部署
├── wrangler.toml
├── index.html
└── package.json
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动 Vite 本地预览 |
| `npm run build` | 构建前端静态资源 |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | TypeScript 类型检查 |
| `npm run pages:dev` | 本地运行 Pages Functions |

## 部署

项目默认部署到 Cloudflare Pages。推送到 `main` 后，GitHub Actions 会自动执行：

```bash
npm ci
npm run build
npx wrangler pages deploy dist --project-name=mazu-tianhou-lots
```

需要在 GitHub 仓库配置以下 Secrets：

| Secret | 用途 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID |

并在 Cloudflare Pages 项目中配置：

| Secret | 用途 |
| --- | --- |
| `DEEPSEEK_API_KEY` | DeepSeek API Key |
| `DEEPSEEK_MODEL` | DeepSeek 模型名，默认 `deepseek-chat` |

## 隐私与安全

- 所填写的问事内容仅用于本次解签请求，不写入存储。
- API Key 仅存在于服务端 Secret 或本地 `.dev.vars`。
- `.env`、`.dev.vars` 已被 `.gitignore` 排除。
- 项目不包含跟踪、统计或第三方广告脚本。

## License

本仓库由上游泉州关帝圣杯抽签项目改造而来，使用 [GPL-3.0](LICENSE)。
