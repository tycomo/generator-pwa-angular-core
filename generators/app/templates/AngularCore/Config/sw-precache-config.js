module.exports = {
  staticFileGlobs: [
                'Home/Index',
                'Shared/_Layout',
                '/',

                'wwwroot/dist/**.js',
                'wwwroot/dist/**.css',
                'wwwroot/dist/**.png'
  ],
  root: 'wwwroot',
  navigateFallback: 'Home/Index',
  stripPrefix: 'wwwroot/',
  runtimeCaching: [{
  urlPattern: /node-hnapi\.herokuapp\.com/,
  handler: 'networkFirst'
}]
};

