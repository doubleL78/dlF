var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins: [
        commonsPlugin,
        new webpack.ProvidePlugin({
            $: 'jquery',
            Mock: 'mockjs',
        })//,
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    entry: './src/App.js',
    output: {
        path: './dist',
        filename: 'bundle.js',
    },
    resolve: {
        modulesDirectories: ['node_modules', './src'],
        extensions: ['', '.js', '.jsx'],
        alias: {
            antdcss: 'antd/dist/antd.min.css',  // import时的别名
        }
    },
    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 babel-loader 来编译处理
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react'],
                    plugins: [
                        ['import', { libraryName: 'antd', style: 'css'}]
                    ]
            }},
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
};
