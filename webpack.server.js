const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    
    target: 'node',

    entry: './src/store/server/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },

    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              'react',
              ['env', {
                target: {browsers: ['last 2 versions']}
              }]
            ]
        }
        }
      },
      {
				test: /\.css$/,
				use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader"
          }
        ]
			},
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]-[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                }),
              ]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
    },

    externals: [webpackNodeExternals()],

    plugins: [

      new CleanWebpackPlugin([
        'build/build-*.js'
      ]),

      new MiniCSSExtractPlugin({
        filename: 'assets/css/bundle.css',
        chunkFilename: 'assets/css/bundle.css'
      }),
  
    ]
    
}