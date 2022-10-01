export const config = {
    projectName : process.env.PROJECT_NAME || require('./example.json').name,
    projectDescription : process.env.PROJECT_DESCRIPTION || require('./example.json').description,
    dataDir : process.env.VENOM_DUMPS || '../public/result'
}