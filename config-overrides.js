const webpack = require('webpack');

module.exports = function override(config, env) {
	console.log('override');
	let loaders = config.resolve;
	loaders.fallback = {
		https: require.resolve('agent-base'),
		http: require.resolve('agent-base'),
		path: require.resolve('path-browserify'),
		fs: require.resolve('babel-plugin-preval'),
		assert: require.resolve('assert/'),
	};
	return config;
};
