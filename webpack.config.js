module.exports = {
    entry: './src/App.js',
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
};