const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const spritemithPlugin = require('webpack-spritesmith');

module.exports = merge(common, {
    mode:'production',
    devtool: "source-map",//生产环境也可以设置，有点儿影响性能，但方便调试
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.BannerPlugin("版权所有，盗版必究！"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `'production'`
        }),
        new spritemithPlugin({
            //设置源icons,即icon的路径，必选项
            src: {
                cwd: path.resolve(__dirname, '../src/sprite/'),
                glob: '*.*'
            },
            //设置导出的sprite图及对应的样式文件，必选项
            target: {
                image: path.resolve(__dirname, '../build/sprite/sprite.png'),
                css: path.resolve(__dirname, '../build/sprite/sprite.css')  //也可以为css, sass文件，需要先安装相关loader
            },
            //设置sprite.png的引用格式
            apiOptions: {
                cssImageRef: '../sprite/sprite.png'  //cssImageRef为必选项
            },
            //配置spritesmith选项，非必选
            spritesmithOptions: {
                algorithm: 'top-down'//设置图标的排列方式
            }
        }),
    ]
});