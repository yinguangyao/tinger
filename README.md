# tinger
这是一个基于 monorepo 的 React 项目，包含了 React、TypeScript、Eslint、Prettier、Commitlint 等等工具。
项目使用 lerna 和 yarn workspace 来管理。
## monorepo
使用 lerna 和 yarn workspace，可以将公共依赖都安装到顶部，节省资源。
也可以处理多个项目之间的依赖。
## 创建一个子项目
运行 `yarn run create --p <project name>`
## 运行一个子项目
`yarn workspace <project name> run start`
## 安装依赖包
### 安装到子项目
`yarn workspace <project name> add xxx`
### 安装到根目录
`yarn add -W- D add xxx`
### 给所有项目安装
`yarn workspaces add xxx`
