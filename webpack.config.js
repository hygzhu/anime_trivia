const { resolve } = require('path');
const webpack = require('webpack');

// Plugins
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// TODO: ExtractTextPlugin -- for production build
// TODO: Radium

module.exports = function( env = {} ){
  const isProd = !!env.prod;
  const entryFile = isProd ?
                    "./index.js" :
                    [
                      'react-hot-loader/patch',
                      'webpack-dev-server/client?http://localhost:8080',
                      'webpack/hot/only-dev-server',
                      './index.js'
                    ]

  let config = {
    context: resolve(__dirname, 'src'),
    entry: entryFile,
    output: {
      path: resolve(__dirname, 'dist'),
      filename: '[name].[hash].js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } }
          ],
          exclude: ['./styles.css']
        },
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new Dotenv()
    ]
  }

  // Different Configurations for Development Build VS Production Build
  if (!isProd) {
    // For HMR
    config.devServer = {
      hot: true,
      contentBase: resolve(__dirname, 'dist'),
      publicPath: '/'
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NamedModulesPlugin());
  }

  if (isProd) {
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module) {
             return module.context && module.context.indexOf('node_modules') !== -1;
          }
      })
    );
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest'
      })
    );
  }


  return config;
}
