webpack4-demo单页

#配置webpack
webpack 4.12.0

webpack4增加一个mode配置，只有两个值development | production，对于不同的环境它提供不同的一些默认配置，

module.exports = {
	mode: 'production'
}
或者从cli参数中传递  webpack --mode=production


module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}

module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}

不同的模式下的默认配置如下：
  1.生产环境默认开启了很多代码优化 
  2.开发时开启注释和验证，并且自动加上eval devtool
  3.生产环境不支持watching，开发环境优化了重新打包的速度
  4.生产环境开启模块串联（ModuleConcatenationPlugin)
  5.自动设置process.env.NODE_ENV到不同环境，也就是不需要DefinePlugin来做这个了
  6.如果把mode设置为none，所有默认设置都去掉