const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/js/main.js'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader?cacheDirectory=true",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                }
            },
            { // 分离 css
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {

                            outputPath: "", // 这里的 images 貌似没什么作用，但不写不行，可以是任意的一个或多个字符
                            name: "[name].[ext]",
                            useRelativePath: true// 这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
                        }
                    },
                    // {
                    //     loader:'url-loader',
                    //     options: {
                    //         limit: 50000, //表示小于50kb选项参数可以多大的图片转换成base64
                    //         outputPath:'/' //定义输出的图片的文件夹
                    //     }
                    // }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }]
            },
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(["../dist"]),
        new HtmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true, //去掉属性值后的双引号
            },
            hash:true, //为了开发中js缓存效果，所以加入hash，这样可以有效避免缓存js，
            template: path.resolve(__dirname, "../src/index.html") //打包的html模板
        }),
        new ExtractTextPlugin("css/abc.css") // 可以单独设置css的路径
    ]
};