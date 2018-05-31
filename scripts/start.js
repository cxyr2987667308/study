const fs = require('fs');
const inquirer = require('inquirer');
const { generateTemplate } = require('./utils');

let moduleName;

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
		});
	})
});