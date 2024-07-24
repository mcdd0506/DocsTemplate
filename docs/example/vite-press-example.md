# Vite Press 搭建教程

> [!TIP]
>
> 使用 [VitePress](https://vitepress.dev/guide/getting-started) 搭建个人博客，主要用于记录搭建过程

## 一、概述

### 1.1 VitePress 介绍

[VitePress](https://vitepress.dev/zh/) 是一个基于 Vite 和 Vue 3 的静态网站生成器，专门为构建文档网站而设计。它是 VuePress 的继承者，旨在提供更快的构建速度和更现代的开发体验。VitePress 利用了 Vite 的即时服务器启动和模块热替换（HMR）功能，使得开发文档网站变得更加高效。

以下是 VitePress 的一些关键特性：

1. **快速开发服务器**：VitePress 使用 Vite 作为其开发服务器，这意味着你可以享受到几乎即时的服务器启动和快速的 HMR

2. **基于 Vue 3**：VitePress 完全基于 Vue 3，包括 Composition API、Teleport、Suspense 等新特性

3. **Markdown 扩展**：VitePress 对 Markdown 语法进行了扩展，支持 Vue 组件、代码高亮、目录、自定义容器等功能

4. **主题定制**：你可以通过创建自定义主题来定制网站的外观和感觉，VitePress 的主题系统允许你完全控制网站的样式和布局

5. **静态站点生成**：VitePress 生成的是静态 HTML 文件，这意味着你可以将它们部署到任何静态文件托管服务上，如 GitHub Pages、Netlify、Vercel 等

6. **插件系统**：VitePress 支持插件，你可以通过插件来扩展 VitePress 的功能，比如添加新的 Markdown 扩展、修改构建过程等。

7. **国际化支持**：VitePress 内置了对多语言文档的支持，可以轻松地为不同语言的读者提供翻译

8. **SEO 友好**：由于 VitePress 生成的是静态内容，因此它对搜索引擎优化（SEO）非常友好

![image-20240516174320355](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516174320355.png)

### 1.2 功能

- markdown 拓展支持
- 引入 giscus 实现评论功能
- PicGO + OSS 实现图片上传
- 通过 github workflow 自行搭建部署
- 提供 Docker Image 容器化部署
- 通过 electron 打包分发

## 二、环境安装

### 2.1 node + yarn

> [!CAUTION]
>
> - 案例使用最新的 [node](https://nodejs.org/en/download) 版本 `20.13.0` 其它版本请自行测试 (vite press 官方要求 node 版本需要 18+)

node 的安装推荐使用 nvm 进行安装，nvm 是一款 node 的管理工具，可以切换不同版本的 node ，安装方式：

- 直接到 https://github.com/coreybutler/nvm-windows/releases/tag/1.1.12 进行下载即可

![image-20240516180515773](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516180515773.png)

安装好后可以通过 `nvm -v` 查看 nvm 的版本

具体使用请参考 https://github.com/coreybutler/nvm-windows

接下来我们先通过 nvm 安装 node + npm，然后通过 npm 安装 yarn

- 执行 `nvm install 20.13.0`
- 安装完毕后执行 `nvm use 20.13.0`
- 安装 yarn `npm install --global yarn`
- 输出下面的命令查看

![image-20240516130103516](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516130103516.png)

### 2.2 git

[Git](https://git-scm.com/) 是一个分布式版本控制系统，它被广泛用于跟踪和管理软件开发项目中的代码变更。Git 由 Linus Torvalds 在2005年创建，最初是为了管理 Linux 内核的开发，但现在它已经成为全球开发者社区中最受欢迎的版本控制工具之一。

![image-20240516175400308](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516175400308.png)

> [!TIP]
>
> 安装好 git 后最后进行下代理配置 （配置文件路径为 用户目录/.gitconfig）如果用户目录下没有该文件，直接手动创建一个就可以

![image-20240516175626830](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516175626830.png)

将下面的内容添加到 `.gitconfig` 中

```ini
[user]
  name = cbq-win
  email = 2024cbq@gmail.com
[http]
  proxy = http://127.0.0.1:7890
  postBuffer = 5M
[https]
  proxy = https://127.0.0.1:7890
```

查看 `git config --list`

![image-20240516175750338](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516175750338.png)

### 2.3 WebStorm

[WebStorm ](https://www.jetbrains.com/webstorm/promo/?msclkid=c817a54659e31aee6ed4c30381237bf5&utm_source=bing&utm_medium=cpc&utm_campaign=APAC_en_JP_WebStorm_Branded&utm_term=webstorm&utm_content=webstorm)是一款由 JetBrains 公司开发的集成开发环境（IDE），专为 JavaScript、TypeScript、HTML 和 CSS 等前端技术栈的开发而设计。它提供了强大的代码编辑、调试、版本控制和自动化工具，旨在提高开发者的工作效率和代码质量。

![image-20240516175914413](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516175914413.png)

> [!TIP]
>
> 我使用的版本为 2024.1.2，推荐对 WebStorm 也进行下代理配置

![image-20240516180127273](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516180127273.png)

![image-20240516180141126](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516180141126.png)

## 三、使用

### 3.1 初始化 VitePress

1. `yarn add -D vitepress`

![image-20240516130828804](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516130828804.png)

2. `yarn vitepress init`

![image-20240516131011334](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516131011334.png)

3. `yarn run docs:dev`

![image-20240516131146093](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516131146093.png)

> [!TIP]
>
> 点击 `localhost:5173` 出现下面页面即为搭建成功

![image-20240516131201607](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240516131201607.png)

## 四、项目说明

>  [!IMPORTANT]
>
> - `.github 文件夹` (需位于项目根目录下其下面的 *.yaml 文件都会被 github 自动识别用于自动构建)
> - `config 文件夹` nginx 配置文件搭配 Dockerfile 用于镜像构建
> - `docs 文件夹` VitePress 工作文件夹，默认情况下会将该文件下的 *.md 渲染为 html 呈现
>   - `.vitepress`  用于存放主题配置和插件配置等
>   - `dev-tools` 自定义文件夹，主要用于存放开发工具相关笔记
>   - `example` 自定义文件夹，主要用于存放案例相关笔记
>   - `public` 主要用于存放公共资源
>   - `ABOUT.md` 自定义文件，对应 关于我 页面 https://caobaoqi1029.github.io/docs-template/ABOUT.html
>   - `CHANGELOG.md` 自定义文件，对应 版本 页面 https://caobaoqi1029.github.io/docs-template/CHANGELOG.html
>   - `index.md` 文档入口文件，对应 https://caobaoqi1029.github.io/docs-template/
> - `package.json` 用于定义项目依赖及 script 命令

![image-20240602154451113](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602154451113.png)

> [!CAUTION]
>
> 默认情况下 VitePress 会将每个目录下的 index.md 文件解析为该目录下的入口文件，因此建议命名的时候直接指明

![image-20240602162014057](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602162014057.png)

> 更多信息可参见
>
> - https://vitepress.dev/zh/guide/getting-started
> - https://vitepress.dev/zh/reference/site-config#vite%E3%80%81vue-%E5%92%8C-markdown-%E9%85%8D%E7%BD%AE

![image-20240602162033023](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602162033023.png)

## 五、部署

> [!TIP]
>
> tag 操作可参见 [项目说明](# 四、项目说明)

### 5.1 部署到 github pages

> [!NOTE]
>
> 项目通过 github workflow 工作流自动部署，其中 GitHub Workflow 是 GitHub 提供的自动化工具，使用 GitHub Actions 实现。它使开发者可以在代码库中自动化各种任务，从代码的构建、测试到部署。

1. 为项目创建相关仓库 ([用户名].github.io) 要求该仓库为公开库

![image-20240602154853439](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602154853439.png)

2. 创建 workflow 文件 （即项目根目录下的 github/*.yaml 文件都会被 github 自动识别）下面为该项目的：vite-press-deploy.yaml 文件

```yaml
name: CI|CD 部署文档
permissions:
  contents: write
on:
  push:
    tags:
      - v*

jobs:
  build:
    name: build vite press
    runs-on: ${{ matrix.os }}
    defaults:
      run:
        shell: bash

    if: startsWith(github.ref, 'refs/tags/')
    strategy:
      fail-fast: false
      matrix:
        os: [ ubuntu-latest ]

    steps:
      - name: 读取仓库内容 👓
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: 设置 Node.js 🎶
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 安装 yarn 🐸
        run: npm install --global yarn

      - name: 构建文档 🔨
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          yarn install
          yarn run docs:build
          > docs/.vitepress/dist/.nojekyll

      - name: 部署文档 👌
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: pages
          folder: docs/.vitepress/dist

```

> [!NOTE]
>
> 1. **触发器**：当推送以 `v` 开头的标签时触发工作流。
> 2. **运行环境**：使用 Ubuntu 最新版本作为运行环境。
> 3. 步骤：
>    - 检出仓库内容。
>    - 设置 Node.js 版本为 20、安装 yarn。
>    - 构建 VitePress 文档，并生成 `.nojekyll` 文件。
>    - 将构建的文档部署到 GitHub Pages 的 `pages` 分支。
>
> 通过这个工作流，实现了从构建到部署的自动化流程，确保文档在每次发布新版本标签时都能及时更新和发布。

![image-20240602160932985](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602160932985.png)

![image-20240516182545151](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/202405161825256.png)

3. 完成上面操作后会有 pages 分支

![image-20240602155442367](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602155442367.png)

4. 部署到 github pages

![image-20240602155554605](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602155554605.png)

![image-20240602155622819](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602155622819.png)

![image-20240602155639384](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602155639384.png)

### 5.2 发布为 Release

> [!CAUTION]
>
> 注意：发布为 Release 和 Docker Image 对于文档类并没多大的用处（通过上述的 github pages 已经可以满足文档类项目的部署了） 此处写出来只是为了单纯记录

要想发布为 Release 仅需在上面的 yaml 文件的 （构建文档 🔨 和  部署文档 👌） 之间加入相关步骤 (打包 zip 文件 🔨、upload artifacts 📦、release 😶‍🌫️) 即可

```yaml
      - name: 构建文档 🔨
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          yarn install
          yarn run docs:build
          > docs/.vitepress/dist/.nojekyll

      - name: 打包 zip 文件 🔨 // [!code ++]
        run: |
          mkdir -p ./build
          zip -r ./pages.zip ./docs/.vitepress/dist
          echo "pages.zip 打包成功"
          cp ./pages.zip ./build/

      - name: upload artifacts 📦 // [!code ++]
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.os }}
          path: build

      - name: release 😶‍🌫️ // [!code ++]
        uses: softprops/action-gh-release@v1
        if: startsWith(github.ref, 'refs/tags/')
        with:
          files: 'build/**'
        env:
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}

      - name: 部署文档 👌
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: pages
          folder: docs/.vitepress/dist
```

![image-20240602160612380](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602160612380.png)

### 5.3 发布为 Docker Image

> [!CAUTION]
>
> 此处演示的是将项目发布到 github 的 Docker Registory 即 (ghcr.io)

下面为该项目的：push-docker.yaml 文件

```yaml
#
name: CI|CD Docker 推送

# This workflow runs when any of the following occur:
# - A push is made to a branch called `main` or `seed`
# - A tag starting with "v" is created
# - A pull request is created or updated
on:
  push:
    tags:
      - v*
  pull_request:
  # This creates an environment variable called `IMAGE_NAME ` with the value `ghtoken_product_demo`.
env:
  IMAGE_NAME: docs-template
#
jobs:
  # This pushes the image to GitHub Packages.
  push:
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash
    permissions:
      packages: write
      contents: read
      #
    steps:
      - name: 读取仓库内容 👓
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: 设置 Node.js 🎶
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 安装 yarn 🐸
        run: npm install --global yarn

      - name: 构建文档 🔨
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: |-
          yarn install
          yarn run docs:build
          > docs/.vitepress/dist/.nojekyll

      - name: Build image
        run: docker build . --file Dockerfile --tag $IMAGE_NAME --label "runnumber=${GITHUB_RUN_ID}"

      - name: Log in to registry
        run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: Push image
        run: |
          IMAGE_ID=ghcr.io/${{ github.repository_owner }}/$IMAGE_NAME

          # This changes all uppercase characters to lowercase.
          IMAGE_ID=$(echo $IMAGE_ID | tr '[A-Z]' '[a-z]')
          # This strips the git ref prefix from the version.
          VERSION=$(echo "${{ github.ref }}" | sed -e 's,.*/\(.*\),\1,')
          # This strips the "v" prefix from the tag name.
          [[ "${{ github.ref }}" == "refs/tags/"* ]] && VERSION=$(echo $VERSION | sed -e 's/^v//')
          # This uses the Docker `latest` tag convention.
          [ "$VERSION" == "main" ] && VERSION=latest
          echo IMAGE_ID=$IMAGE_ID
          echo VERSION=$VERSION
          docker tag $IMAGE_NAME $IMAGE_ID:$VERSION
          docker push $IMAGE_ID:$VERSION

```

![image-20240602160905211](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602160905211.png)

![image-20240602160653226](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602160653226.png)

## 其它

> [!TIP]
>
> 下面的内容主要为插件配置，通过插件我们可以拓展 VitePress 功能，实现更强的自定义，对于插件配置来说，通常步骤为：
>
> 1. 在 package.json 中添加相关插件的坐标，引入依赖
> 2. 在 .vitepress/theme/index.js 中配置插件

### X.1 为项目添加公式支持

```json
"markdown-it": "^14.1.0",
"markdown-it-mathjax3": "^4.3.2",
```

在 .vitepress/config.mjs 中添加

```js
    markdown: {
        math: true,
        lineNumbers: true
    },
```

![image-20240602163942376](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602163942376.png)

### X.2 添加成员组件

可以在任何页面上使用从 `vitepress/theme` 暴露出的公共组件 `<VPTeamMembers>` 显示团队成员。

```md
<script setup>
import { VPTeamMembers } from 'vitepress/theme';

const members = [
  {
    avatar: 'https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/avatar.png',
    name: 'cbq1029',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/caobaoqi1029' },
      { icon: {
                    svg: '<svg t="1713342157310" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1444" width="16" height="16"><path d="M512 960A448 448 0 1 1 512 64a448 448 0 0 1 0 896z m226.752-497.792H484.352a22.144 22.144 0 0 0-22.144 22.144v55.296c0 12.224 9.92 22.144 22.08 22.144h154.88c12.288 0 22.144 9.92 22.144 22.08v11.072c0 36.672-29.696 66.368-66.368 66.368H384.768a22.144 22.144 0 0 1-22.08-22.08V429.056c0-36.672 29.696-66.368 66.304-66.368h309.76c12.16 0 22.08-9.92 22.08-22.144v-55.296a22.144 22.144 0 0 0-22.08-22.144h-309.76a165.888 165.888 0 0 0-165.888 165.952v309.696c0 12.224 9.92 22.144 22.144 22.144h326.272a149.312 149.312 0 0 0 149.376-149.312V484.352a22.144 22.144 0 0 0-22.144-22.144z" fill="#C71D23" p-id="1445"></path></svg>',
                }, link: 'https://gitee.com/caobaoqi' },
      { icon: {
                    svg: '<svg t="1713342337553" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2496" width="16" height="16"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" fill="#20B0E3" p-id="2497"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" fill="#20B0E3" p-id="2498"></path></svg>',
                }, link: 'https://space.bilibili.com/1045499440?spm_id_from=333.1007.0.0' }
    ]
  },
]
</script>


## Author

<VPTeamMembers size="small" :members="members" />
```

![image-20240602164208595](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602164208595.png)

### X.3 通过 giscus 为文档添加评论功能

> [!CAUTION]
>
> Giscus 是利用 [GitHub Discussions](https://docs.github.com/en/discussions) 实现的评论系统，让访客借助 GitHub 在你的网站上留下评论和反应，我们可以将评论系统与需要链接的项目仓库进行绑定，其中仓库需要满足以下要求
>
> 1. **该仓库是[公开的](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public)**，否则访客将无法查看 discussion。
> 2. **[giscus](https://github.com/apps/giscus) app 已安装**，否则访客将无法评论和回应。
> 3. **Discussions** 功能已 [在你的仓库中启用](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository)。

![image-20240602170419866](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602170419866.png)

![image-20240602170025361](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602170025361.png)

![image-20240602170513423](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602170513423.png)

https://www.npmjs.com/package/vitepress-plugin-comment-with-giscus

![image-20240602165735501](https://2024-cbq-1311841992.cos.ap-beijing.myqcloud.com/picgo/image-20240602165735501.png)

```json
"vitepress-plugin-comment-with-giscus": "^1.1.15"
```

在 .vitepress/theme/index.js 中添加 giscus 相关信息

```
import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { toRefs } from "vue";

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        // ...
    },
    setup() {
        // 获取前言和路由
        const { frontmatter } = toRefs(useData());
        const route = useRoute();

        // 评论组件 - https://giscus.app/
        giscusTalk({
            repo: '你的仓库地址',
            repoId: '你的仓库id',
            category: '你选择的分类', // 默认: `General`
            categoryId: '你的分类id',
            mapping: 'pathname', // 默认: `pathname`
            inputPosition: 'top', // 默认: `top`
            lang: 'zh-CN', // 默认: `zh-CN`
            // i18n 国际化设置（注意：该配置会覆盖 lang 设置的默认语言）
            // 配置为一个对象，里面为键值对组：
            // [你的 i18n 配置名称]: [对应 Giscus 中的语言包名称]
            locales: {
                'zh-Hans': 'zh-CN',
                'en-US': 'en'
            },
            homePageShowComment: false, // 首页是否显示评论区，默认为否
            lightTheme: 'light', // 默认: `light`
            darkTheme: 'transparent_dark', // 默认: `transparent_dark`
            // ...
        }, {
            frontmatter, route
        },
            // 是否全部页面启动评论区。
            // 默认为 true，表示启用，此参数可忽略；
            // 如果为 false，表示不启用。
            // 可以在页面使用 `comment: true` 前言单独启用
            true
        );
    }
};
