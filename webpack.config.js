const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './dist/app.js',  // Your main entry file
  target: 'node',  // Ensures that built-in Node.js modules like `fs` are not bundled
  output: {
    filename: 'app.js',  // Output bundle file
    path: path.resolve(__dirname),  // Directory for the output file
  },
  externals: [nodeExternals()],  // Exclude node_modules from the bundle
  mode: 'production',  // Production mode for minified output
};