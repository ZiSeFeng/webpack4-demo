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


拆分公共模块
  由于CommonChunkPlugin已被webpack4抛弃，webpack4推荐使用splitChunkPlugin来提取公共模块。


optimization: {
    //提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代
    //主要用于多页面
    //例子代码 https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
    //SplitChunksPlugin配置，其中缓存组概念目前不是很清楚
    splitChunks: {
        // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
        chunks: "all",
        // 表示在压缩前的最小模块大小，默认为0；
        minSize: 30000,
        //表示被引用次数，默认为1
        minChunks: 1,
        //最大的按需(异步)加载次数，默认为1；
        maxAsyncRequests: 3,
        //最大的初始化加载次数，默认为1；
        maxInitialRequests: 3,
        // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
        name: true,
        //缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
        cacheGroups: {
            //缓存组信息，名称可以自己定义
            commons: {
                //拆分出来块的名字,默认是缓存组名称+"~" + [name].js
                name: "test",
                // 同上
                chunks: "all",
                // 同上
                minChunks: 3,
                // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                enforce: true,
                //test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
                test:""
            },
            //设置多个缓存规则
            vendor: {
                test: /node_modules/,
                chunks: "all",
                name: "vendor",
                //表示缓存的优先级
                priority: 10,
                enforce: true
            }
        }
    }
}