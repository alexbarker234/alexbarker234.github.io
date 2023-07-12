const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/main.ts",
    plugins: [new MiniCssExtractPlugin({ filename: "bundle.css" })],
    output: {
        path: path.resolve(__dirname, "../"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    // optimization: {
    //     minimize: false,
    // },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "../"),
        },
        client: {
            overlay: false,
        },
        port: 9000,
    },
};