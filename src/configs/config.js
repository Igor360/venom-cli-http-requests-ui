export const config = {
	projectName: process.env.REACT_APP_PROJECT_NAME || require('./example.json').name,
	projectDescription:
		process.env.REACT_APP_PROJECT_DESCRIPTION || require('./example.json').description,
	baseUrl: process.env.REACT_APP_BASE_URL || require('./example.json').url,
	APIVer: process.env.REACT_APP_API_VER || require('./example.json').api_ver,
	dataDir: process.env.REACT_APP_VENOM_DUMPS || '../public/result',
};
