const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.tsx",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // For JavaScript/JSX files
                use: 'babel-loader',
              },
            {
                
                test: /\.tsx?$/,
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
                exclude: /node_modules/,
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.css$/, // For CSS files
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.(png|jpe?g|gif|svg)$/, // For images
                use: 'file-loader',
              },
              {
                test: /\.yaml$/, // For YAML files
                use: 'yaml-loader',
              },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "../manifest.json" },
                { from: "src/contentScript.js", to: "../contentScript.js" },
            ],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React extension",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
