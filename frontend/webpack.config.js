import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'

dotenv.config({ path: '~/Prog/std/.env' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const exports = {
  // resolve и plugins добавлены для того, чтобы работала соль
  resolve: {
    fallback: {
      os: false,
      fs: false,
      path: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SALT': JSON.stringify(process.env.SALT),
    }),
  ],
  entry: './src/app.js',
  mode: 'development',
  output: {
    path: path.join(__dirname + '/dist'),
    filename: './index.js',
    publicPath: '/',
  },
  devServer: {
    static: './dist',
    compress: true,
    port: process.env.APP_PORT,
    host: process.env.APP_ADDR,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader'],
      },
    ],
  },
}

export default exports
