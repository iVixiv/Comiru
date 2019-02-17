const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  exportPathMap() {
    return {
      '/index.html': { page: '/' },
      '/register.html': { page: '/register' },
      '/home.html': { page: '/home' },
    };
  }
  // webpack: (config, options) => {
  //   // modify the `config` here
  //   console.log(config, options);
  //   return config;
  // }
};
console.log(nextConfig);

module.exports = withPlugins([
  [optimizedImages, {
    // these are the default values so you don't have to provide
    // them if they are good enough for your use-case.
    // but you can overwrite them here with any valid value you want.
    inlineImageLimit: 8192,
    imagesFolder: 'assets',
    imagesName: '[name]-[hash].[ext]',
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    mozjpeg: {
      quality: 80
    },
    optipng: {
      optimizationLevel: 3
    },
    pngquant: false,
    gifsicle: {
      interlaced: true,
      optimizationLevel: 3
    },
    svgo: {
      plugins: [
        { removeComments: false }
      ]
      // enable/disable svgo plugins here
    },
    webp: {
      preset: 'default',
      quality: 75
    }
  }],
  nextConfig
]);
