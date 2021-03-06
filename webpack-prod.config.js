webpack = require('webpack')
const path = require('path');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    context: __dirname + '/source',
    entry: {
        javascript: './application.js',
        html: './index.html'
    },
    loader: {
        appSettings: {
            env: "production"
        },
    },
    output: {
        path: __dirname + '/build',
        filename: '/application.js'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'source', 'source/images'],
        fallback: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader', 'eslint-loader'],
                include: [new RegExp(path.join(__dirname, 'source')), new RegExp(path.join(__dirname, 'tests'))]
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ],
    },
    preLoaders: [
        {
            test: /\.js$/,
            loaders: ['eslint'],
            include: [new RegExp(path.join(__dirname, 'source'))]
        }
    ],
    eslint: {
        failOnError: false,
        failOnWarning: false
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
            output: {
                comments: false
            }
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            minRatio: 0.8
        })
    ]
};
