const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development", 
    entry: {
        index: "./src/index.tsx",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                use: "babel-loader",
            },
            {
                test: /\.tsx?$/, // For TypeScript files
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    },
                ],
            },
            {
                test: /\.css$/, // For CSS files
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, // For image files
                type: "asset/resource",
            },
            {
                test: /\.yaml$/, // For YAML files
                use: "yaml-loader",
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css", // Extract CSS into separate files
        }),
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
                { from: "src/contentScript.js", to: "../contentScript.js" },
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"], // Resolve these file extensions
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].[contenthash].js", // CSP-compliant hashed file name
        clean: true, // Clean old files in the output directory
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React Extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
                inject: "body", // Inject scripts into the body
            })
    );
}
