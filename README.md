# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

使用primevue tailwindcss typescript nuxt vue3

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```
## db

## prisma
pnpm prisma studio
pnpm prisma generate dev
pnpm prisma migrate dev
pnpm prisma migrate dev --name init
pnpm prisma db push --force-reset

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## build env

```env
DATABASE_URL=file:/home/ubuntu/code/order-sync/dev.db
```

## preview

需要先全局安装或者安装为开发依赖 `pnpm i -g @dotenvx/dotenvx`

## 项目文件组织结构

my-nuxt-app/
├── .nuxt/               # 构建输出目录（自动生成，不应手动修改）
├── .output/             # 生产构建输出目录
├── assets/              # 未编译的资源文件 (图片, 样式等)
│   # https://nuxt.com/docs/getting-started/assets
├── components/          # Vue 组件目录（自动导入）
│   # https://nuxt.com/docs/guide/directory-structure/components
├── composables/         # 组合式函数目录（自动导入）
│   # https://nuxt.com/docs/guide/directory-structure/composables
├── content/             # 用于内容管理的目录（如果使用 @nuxt/content 模块）
│   # https://content.nuxtjs.org/
├── layouts/             # 应用布局目录
│   # https://nuxt.com/docs/guide/directory-structure/layouts
├── middleware/          # 路由中间件目录
│   # https://nuxt.com/docs/guide/directory-structure/middleware
├── pages/               # 应用页面目录（自动生成路由）
│   # https://nuxt.com/docs/guide/directory-structure/pages
├── plugins/             # 插件目录（在应用启动时运行）
│   # https://nuxt.com/docs/guide/directory-structure/plugins
├── public/              # 静态资源目录（直接映射到服务器根路径）
│   # https://nuxt.com/docs/guide/directory-structure/public
├── server/              # 服务器路由和中间件
│   ├── api/             # API 路由目录
│   ├── middleware/      # 服务器中间件目录
│   └── routes/          # 服务器路由目录
│   # https://nuxt.com/docs/guide/directory-structure/server
├── stores/              # Pinia store 文件（如果使用 Pinia）
│   # https://pinia.vuejs.org/ssr/nuxt.html
├── utils/               # 工具函数目录（自动导入）
│   # https://nuxt.com/docs/guide/directory-structure/utils
├── .gitignore           # Git 忽略文件
├── app.vue              # 应用的主组件
│   # https://nuxt.com/docs/guide/directory-structure/app
├── error.vue            # 错误页面
│   # https://nuxt.com/docs/getting-started/error-handling
├── nuxt.config.ts       # Nuxt 配置文件
│   # https://nuxt.com/docs/guide/directory-structure/nuxt.config
├── package.json         # 项目依赖和脚本
├── tsconfig.json        # TypeScript 配置文件
└── README.md            # 项目说明文档

# 其他可能的文件和目录：
# .env                   # 环境变量文件
# https://nuxt.com/docs/guide/directory-structure/env
# app.config.ts          # 应用运行时配置
# https://nuxt.com/docs/guide/directory-structure/app-config
# tailwind.config.js     # Tailwind CSS 配置（如果使用）
# https://tailwindcss.nuxtjs.org/
# vitest.config.ts       # Vitest 配置（如果使用 Vitest 进行测试）
# https://nuxt.com/docs/getting-started/testing