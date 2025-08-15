const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const moment = require('moment');

// 修复环境变量检测 - 确保构建时正确识别环境
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

// 代码在什么环境运行（local 本地开发、dev 测试服务器、prod 线上服务器）
const appEnv = isProduction ? 'prod' : 'dev';

console.log('Build Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  isProduction,
  isDevelopment,
  appEnv
});

console.log('Webpack config loading...');

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  stats: 'verbose',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@mock': path.resolve(__dirname, 'src/mock')
    }
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env.appEnv': JSON.stringify(appEnv),
      'process.env.buildTime': JSON.stringify(isProduction ? moment().format('YYYYMMDD_HHmmSS') : ''),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true
  }
};