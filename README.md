# admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# admin
# admin demo



### renderContent方法用到了jsx语法，webpack打包的时候，报语法错误，所以需要要引入babel的JSX解析器，把JSX转化成JS语法，这个工作会由babel自动完成。
```npm install babel-plugin-transform-vue-jsx
npm install babel-helper-vue-jsx-merge-props
npm install babel-plugin-syntax-jsx```
在.babelrc文件配置插件```transform-vue-jsx```