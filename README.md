# tinger
这是一个基于 monorepo 的 React 项目，包含了 React、TypeScript、Eslint、Prettier、Commitlint 等等工具。
项目使用 lerna 和 yarn workspace 来管理。
## monorepo
monorepo 和 multirepo 是相对概念。

通常情况下，我们一个 git 仓库里面只会放一个项目，这种是 multirepo。而一个 git 仓库有多个项目，这个就叫 monorepo。

在开发中，我们可能经常遇到做一些分散的 H5 活动页的情况下，它们一个页面就是一个项目，并且是独立部署的。

如果我们对每个页面都新开一个 React 项目，基础配置一模一样，然后每个项目都放到一个新的 git 仓库，往往效率低下。

如果你有脚手架，那么创建新项目还比较简单。如果没有脚手架，就需要把之前项目配置拷贝过来做修改，影响效率。

这里使用了 lerna 和 yarn workspace，可以将公共依赖都安装到顶部，节省了资源开销。

所有项目通用一份 webpack 构建配置，不必针对每个项目都配置一下。

### yarn workspace
yarn workspace 是 yarn 区别于 npm 的一个重要特征，你需要在 package.json 里面设置 private 为 true，然后设置 workspaces 属性。

这样你每次新建一个项目，安装依赖的时候，多个项目通用的 node_modules 都会装到项目根目录里面，无须为每个项目都安装一遍。
## 一些命令
### 创建一个子项目
这里编写了一个 NodeJS 脚本，可以把 packages/example 的文件拷贝到其他目录下面，实现生成新项目的效果。

运行 `yarn run create --p <project name>`

如果你对 React 脚手架感兴趣，也可以使用我的 `generator-react-kit` 脚手架。使用命令很简单。
```
yarn global add generator-react-kit
yo react-kit
```
### 运行一个子项目
`yarn workspace <project name> run start`
### 安装依赖到子项目
`yarn workspace <project name> add xxx`
### 安装依赖到根目录
`yarn add -W- D add xxx`
### 给所有项目安装
`yarn workspaces add xxx`
### 构建
运行 `yarn workspace <project name> run build` 来构建。
## 项目配置
### commitlint
使用了 commitlint 来规范团队提交记录，只允许你使用 `feat\fix\chore\doc\refactor` 等等开头的提交。
### eslint + prettier
这里使用了 jsx-a11y 来对代码规范做校验，用 prettier 统一代码格式，保证每个人写出来的代码风格一致。
### husky + lint-staged
用 husky 设置 commit 的时候做 eslint 和 prettier 代码格式校验，在 push 之前进行一次构建，以便于检查出来一些报错。
### typescript
支持用 typescript 来编写 react 代码。
### webpack
使用 create-react-app 创建的项目，已经将 webpack 配置 eject 了出来，支持自己定制。
## 部署
现在都是对每个项目单独构建，配置 nginx 转发到不同的域名。目前已经有了两个项目：
1. [sakura](http://sakura.gyyin.top)
2. [flower](http://flower.gyyin.top)

另附教程：
1. [画一朵樱花](https://github.com/yinguangyao/blog/issues/48)
2. [落樱效果](https://github.com/yinguangyao/tinger/blob/master/packages/sakura/README.md)
