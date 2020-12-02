# tinger
这是一个基于 monorepo 的 React 项目，包含了 React、TypeScript、Eslint、Prettier、Commitlint 等等工具。
项目使用 lerna 和 yarn workspace 来管理。
## monorepo
monorepo 和 multirepo 是相对概念。

一个项目创建一个 git 仓库，这种是 multirepo。一个 git 仓库有多个项目，这个就叫 monorepo。

如果我们有很多 React 项目，基础配置一模一样，每个项目都开一个新的 git 仓库，往往效率低下。

如果你有脚手架，那么创建新项目还比较简单。如果没有脚手架，就需要把之前项目配置拷贝过来做修改，影响效率。

这里使用了 lerna 和 yarn workspace，可以将公共依赖都安装到顶部，节省了资源开销。

所有项目通用一份 webpack 构建配置，不必针对每个项目都配置一下。


## 创建一个子项目
这里编写了一个 NodeJS 脚本，可以把 packages/example 的文件拷贝到其他目录下面，实现生成新项目的效果。

运行 `yarn run create --p <project name>`

如果你对 React 脚手架感兴趣，也可以使用我的 `generator-react-kit` 脚手架。使用命令很简单。
```
yarn global add generator-react-kit
yo react-kit
```
## 运行一个子项目
`yarn workspace <project name> run start`
## 安装依赖包
### 安装到子项目
`yarn workspace <project name> add xxx`
### 安装到根目录
`yarn add -W- D add xxx`
### 给所有项目安装
`yarn workspaces add xxx`
## 构建
运行 `yarn workspace <project name> run build` 来构建。
