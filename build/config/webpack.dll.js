const webpack = require('webpack');
const path = require('path');
const isDebug = process.env.NODE_ENV === 'development';
console.log(isDebug);
const paths = require('./paths');
const outputPath = isDebug ? path.join(paths.appPublic, 'debug') : path.join(paths.appPublic, 'dist');

// 资源依赖包，提前编译
const lib = [
    'core-js',
    'babel-polyfill',
    'moment',
    'react',
    'react-dom',
    'react-router',
    'react-transition-group',
    'immutability-helper',
    'store',
    'immutable',
    'whatwg-fetch',
    'echarts',
    'echarts-for-react'
];

const plugin = [
    new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
        path: path.join(outputPath, 'manifest.json'),
        /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
        name: 'lib.js',
        context: __dirname
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
];

if (!isDebug) {
    plugin.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$', 'exports', 'require']
            },
            compress: { warnings: false },
            output: { comments: false }
        })
    );
}

module.exports = {
    devtool: '#source-map',
    entry: {
        lib: lib
    },
    output: {
        path: outputPath,
        filename: 'lib.js'
    },
    plugins: plugin
};
