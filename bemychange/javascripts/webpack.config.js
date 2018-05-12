const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLESS = new ExtractTextPlugin("css/[name].css");

module.exports = {
    resolve: {
        extensions: ['.jsx', '.es6', '.js', '.json']
    },
    entry: {
        home : [
            './src/home.js'
        ],
        currentActions: [
            './src/actions/currentActions/currentActions.js'
        ],
        lookForActions: [
            './src/actions/lookForActions/lookForActions.js'
        ],
        createAction: [
            './src/actions/createAction/step1.js'
        ]
        //,campagne: ['./src/campagne/less/main.less', './src/campagne/routes.es6']
    },
    output: {
        path: "../static/bundles/", //path.resolve(__dirname, "../static/bundles/"),
        filename: "[name].js",
        publicPath: "/static/bundles/",
        library: "[name]",
        libraryTarget: 'umd'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$|\.es6$|\.jsx$/,
                exclude: /(node_modules|libs)/,
                enforce: "pre"
                //,
                //use: [{loader: "eslint-loader", options: {rules: {semi: 0}}}]
            },
            {
                test: /\.json$/,
                use: "json-loader"
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]

            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.js$|\.es6$|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            {
                test: /\.png$|\.jpg$|\.svg$/,
                use: "file-loader"
            },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
            // other rules
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.js$|\.es6$/
            //,
            //options: {
            //    eslint: {configFile: "./lint-es6.json"}
            //}
        }),
        extractLESS,
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])
    ]
};
