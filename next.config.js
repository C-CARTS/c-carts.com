const withPWA = require('next-pwa');
const runtimeCaching = require('./cache.js');

module.exports = withPWA({
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	webpack5: true,
	future: {
		strictPostcssConfiguration: true
	},
	pwa: {
		disable: process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_SW !== 'true',
		dest: 'public',
		register: true,
		scope: '/',
		maximumFileSizeToCacheInBytes: 15000000,
		cleanupOutdatedCaches: true,
		buildExcludes: [/chunks\/images\/.*$/],
		dynamicStartUrl: true,
		runtimeCaching
	},
	images: {
		domains: ['cdn.sanity.io'],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		formats: ['image/avif', 'image/webp']
	},
	compiler: {
		styledComponents: true
	}
});
