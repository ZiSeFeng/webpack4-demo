const path = require('path');
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const spritemithPlugin = require('webpack-spritesmith');

module.exports = merge(common, {
    mode:'development',
    devtool: 'source-map',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].js',
        publicPath:'/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$':'jquery',
            'jQuery':'jquery',
            'window.jquery':'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':`'development'`
        }),
        new spritemithPlugin({
            //设置源icons,即icon的路径，必选项
            src: {
                cwd: path.resolve(__dirname, '../src/sprite/'),
                glob: '*.*'
            },
            //设置导出的sprite图及对应的样式文件，必选项
            target: {
                image: path.resolve(__dirname, '../dist/sprite/sprite.png'),
                css: path.resolve(__dirname, '../dist/sprite/sprite.css')  //也可以为css, sass文件，需要先安装相关loader
            },
            //设置sprite.png的引用格式
            apiOptions: {
                cssImageRef: '../sprite/sprite.png'  //cssImageRef为必选项
            },
            //配置spritesmith选项，非必选
            spritesmithOptions: {
                algorithm: 'top-down',//设置图标的排列方式,
                padding:5
            }
        })
    ],
    optimization:{//提取公共代码
        splitChunks:{
            cacheGroups:{
                vendor:{
                    //抽离第三方插件
                    test:/node_modules/,
                    chunks:'initial',
                    name:'vendor',//打包后的文件名，任意命名
                    //设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority:0
                },
                utils:{
                    //抽离自己写的公共呆萌，utils这个名字可以随意起
                    chunks:'initial',
                    name:'utils', //任意命名
                    minSize:0 //只要超出0字节就生成一个新包
                }
            }
        }

    },
    // resolve: {
    //     extensions: ['', '.js', '.jsx', '.less', '.css'], //自动全识别哪些后缀，
    //     alias:{  //使用别名，对模块请求重定向，据说可以缩短打包时间
    //         'jquery':'./src/lib/jquery.js'
    //     }
    // },
    // externals:{
    //     './src/js/Swpier':'Swpier',//externals对象的key是给require使用的，比如require('react')，对象的value表示的是如何在global（即window）中访问到该对象，这里的window.react
    // },
    devServer:{
        contentBase:path.resolve(__dirname, '../dist'),
        host:'localhost',//域名
        compress:true, //是否压缩
        port:8888,
        open:true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        //hot:true,
        proxy:{
            target:'http://kaji.local.com',

        }
    }
})