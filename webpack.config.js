var path = require("path");

module.exports = () => {
  return {
    mode: "production",
    entry: "./DatePicker",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.js",
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.*css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
      }
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      },
      "react-dom": {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      }
    }
  };
};
