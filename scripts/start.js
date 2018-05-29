const fs = require('fs');
const process = require('process');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const chalk = require('chalk');
const inquirer = require('inquirer');
const { generateTemplate } = require('./utils');
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

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
		fs.writeFile('src/functions/index.js', indexFileStr)
		// inquirer.prompt({
		// 	type: 'input',
		// 	name: 'name',
		// 	message: '请输入模块名，模块名必须短线小写word连接，示例 hello-world：',
		// 	validate: function (answer) {
		// 		const hasModule = files.findIndex(value => value === answer);
		// 		moduleName = answer;
		// 		if (hasModule !== -1) {
		// 			return `模块${answer}已经存在, 请换个模块名重新创建`;
		// 		}
		// 		return true;
		// 	}
		// }
		// ).then(() => {
		// 	generatorModule(moduleName);
		// });
	})
});

const generatorModule = (m) => {
	/* eslint-disable  */
	console.log(chalk.yellow('=================  HAPPY CODING!!!! ================='));
	/* eslint-enable  */
	const relativePath = `src/functions/${m}`;
	const indexLess = `.${m}{}`;	
	const configJs =
	`const api = {};

	const routes = {
		'/${m}': 'TEST ROUTE'
	};

	export {api, routes};
	`;

	const mainJs =
	`import React, {PureComponent, Component} from 'react';
	import './index.less';

	class ${convert(m)} extends (PureComponent || Component) {
		render () {
			const prefixCls = '${m}';
			return (
				<div className= {prefixCls}> Hello World </div>
			);
		}
	}

	export default ${convert(m)};
	`;

	const indexModuleJs =
	`/**
	* creator:
	* date: ${new Date().toLocaleString()}
	* path:
	* description:
	* @link:
	*/
	import React from 'react';
	import {Route, Switch} from 'react-router-dom';
	import Loadable from 'react-loadable';
	import { Loading } from 'components';

	const Spin = () => <Loading loading />;

	const Main = Loadable({
		loader: () => import('./main.js'),
		loading: Spin,
	});

	export default ({match}) => {
		return (
			<Switch>
				<Route path= {match.url} component={Main} />
			</Switch>
		);
	};
	`;

	fs.mkdir(resolvePath(relativePath), () => {
		fs.mkdirSync(`${relativePath}/routes`);
		fs.mkdirSync(`${relativePath}/components`);
		fs.writeFile(`${relativePath}/config.js`, configJs, () => {
			/* eslint-disable  */
			console.log(chalk.green('配置文件 ' + chalk.blue.underline.bold('config.js') + ' 创建成功!'));
			console.log(chalk.blue('模块的配置文件，配置API接口与面包屑'));
			/* eslint-enable  */
		}
		);
		fs.writeFile(`${relativePath}/index.less`, indexLess, () => {
			/* eslint-disable  */
			console.log(chalk.green('样式less文件 ' + chalk.blue.underline.bold('index.less') + ' 创建成功!'));
			console.log(chalk.blue('在index.less中用less语法写样式'));
			/* eslint-enable  */
		}
		);
		fs.writeFile(`${relativePath}/index.module.js`, indexModuleJs, () => {
			/* eslint-disable  */
			console.log(chalk.green('入口文件' + chalk.blue.underline.bold('index.module.js') + ' 创建成功!'));
			console.log(chalk.blue('模块的入口文件，在该文件中配置最外层的路由'));
			/* eslint-enable  */
		});
		fs.writeFile(`${relativePath}/main.js`, mainJs, () => {
			/* eslint-disable  */
			console.log(chalk.green('主路由文件 ' + chalk.blue.underline.bold('main.js') + ' 创建成功!'));
			console.log(chalk.blue('模块的主路由，可在该文件中配置子路由'));
			/* eslint-enable  */
		});
	});
};
