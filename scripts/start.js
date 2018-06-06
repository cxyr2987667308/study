const fs = require('fs');
const inquirer = require('inquirer');
const { generateTemplate } = require('./utils');
const webpack = require('webpack');
const config = require('../config/webpack.config');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');
const {
	choosePort,
	createCompiler,
	prepareProxy,
	prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3010;
const HOST = process.env.HOST || '0.0.0.0';

// 检测目前有哪些模块
fs.readdir('src/functions', (error, files) => {
	if (error) error();

	inquirer.prompt([{
		type: 'checkbox',
		name: 'modules',
		message: '请选择你要开发的模块吧',
		choices: files.filter((file) => file.match(/\w-\w/))
	}]).then(answers => {
		let indexFileStr = generateTemplate(answers.modules);
		fs.writeFile('src/functions/index.js', indexFileStr, () => {
			console.log(9999);
			const compiler = webpack(config); console.log('compiler',compiler);

			compiler.plugin('invalid', () => {
				console.log('Compiling...');
			});

			compiler.plugin('done', (stats) => {
				const rawMessages = stats.toJson({}, true);
				const message = formatWebpackMessages(rawMessages);
				if(!messages.errors.length && !messages.warnings.length){
					console.log('Compiled successfully!');
				}
				if(messages.errors.length){
					console.log('Failed to compile.');
					messages.errors.forEach(e => console.log(e));
					return;
				}
				if(messages.warnings.length){
					console.log('Compiled with warnings.');
					messages.warnings.forEach(w => console.log(w));
				}
			})

			choosePort(HOST, DEFAULT_PORT).then(port => {
				if(port == null){
					return;
				}
				const urls = prepareUrls('http', HOST, port); console.log('urls', urls);
				openBrowser(urls.localUrlForBrowser);
			})
		});
	})
});