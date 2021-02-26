const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                mapboxgl: 'mapbox-gl',
            }),
        ],
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
          @import "@/scss/globalStyle.scss";
        `
            }
        }
    }
};

