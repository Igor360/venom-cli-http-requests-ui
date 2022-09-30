export const config = {
    projectName : process.env.PROJECT_NAME || require('./example.json').name,
    projectDescription : process.env.PROJECT_Description || require('./example.json').description
}