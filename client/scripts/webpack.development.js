const webpack = require('webpack');
const {merge} = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const devConfig=merge(webpackConfig,{
  mode:'development',
  devtool:'eval-cheap-module-source-map',
  // target:'web',
  entry:{
    app:['webpack-hot-middleware/client?reload=true'],
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          {
            loader: 'css-loader',
            options:{
              importLoaders:1,
              modules:{
                mode:'global',
                localIdentName:'[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                
              },
            },
          },
        ],
      },
      {
        test:/\.less$/,
        use: [
          'style-loader',
          {
            loader:'css-loader',
            options:{
              importLoaders:1,
              modules:{
                mode:'global',
                localIdentName:'[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // execute:true,
              postcssOptions:{
                
              },
            },
          },
          {
            loader:'less-loader',
            options:{
              lessOptions:{
                javascriptEnabled:true,
              },
            },
          },
        ],
        // exclude:[/node_modules/],
      },
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        isDev:true,
      },
      EMAIL:JSON.stringify('ah.yiru@gmail.com'),
      VERSION:JSON.stringify('0.0.x'),
    }),
  ],
});

module.exports=devConfig;
