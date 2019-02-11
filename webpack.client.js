const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');



module.exports = {
  entry: {
      app: './src/store/client/index.js'
  },

  output: {
   publicPath: '/',
   path: path.resolve(__dirname, 'build'),
   filename: 'assets/js/[name].js',
   chunkFilename: 'assets/js/[name].js'
  }, 

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env', 'react']
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
          },
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
  plugins: [

    new CleanWebpackPlugin([
      'dist/app-*.js',
      'dist/bundle-*.css',
    ]),

    new MiniCSSExtractPlugin({
      filename: 'assets/css/bundle.css',
      chunkFilename: 'assets/css/bundle.css'
    }),

    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "template.html"
    })

  ]
};

