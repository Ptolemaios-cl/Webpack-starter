const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const precss = require('precss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    entry: {
        app: [
            './src/js/app.js',
            './src/css/app.scss'
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'document_root')
    },    
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-proposal-class-properties'
                       ]
                    }
                }
            }, {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        'postcss-preset-env',
                                        'precss',
                                        'autoprefixer'
                                    ]
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },{
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer : [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}