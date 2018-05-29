const zlib = require('zlib');
const fs = require('fs');

const convert = (words) => {
	const fistLetterUpper = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	return words.split('-').reduce((accumulator, currentValue) => fistLetterUpper(accumulator) + fistLetterUpper(currentValue));
};

const generateTemplate = (modules) => {
	let indexFileStr = '';
	let exportModules = '';
	let exportRoutes = '';
	modules.forEach(module => {
		indexFileStr += `
		const ${convert(module)} = Loadable({
			loader: () => import('./${module}/index.module.js'),
			loading: Spin
		});

		const ${convert(module)}Routes = require('./${module}/config').routes;`;
		exportModules += `'${module}': ${convert(module)},`;
		exportRoutes += `${convert(module)}Routes,`;
	});
	return `
	import React from 'react';
	import Loadable from 'react-loadable';
	import { Loading } from 'components';

	const Spin = () => <Loading loading />;
	${indexFileStr}
	
	let exportModules = {${exportModules}};
	let exportRoutes =Object.assign({},${exportRoutes});
	
	export {exportModules,exportRoutes};`;
};

const transfor = (file) => {
	const gzip = zlib.createGzip();
	const inp = fs.createReadStream(file);
	const out = fs.createWriteStream(file + '.gz');
	inp.pipe(gzip).pipe(out);
};

const produceGzipFile = function loop (directory) {
	const dirs = fs.readdirSync(directory);
	dirs.forEach(dir => {
		dir = directory + '/' + dir;
		if (/\.(js|css)$/.test(dir)) { // js或者css文件
			if (fs.statSync(dir).size > 102400) { transfor(dir); } // 大于100kB 使用gzip压缩
		} else if (fs.statSync(dir).isDirectory()) {
			loop(dir);
		}
	});
};

exports.convert = convert;
exports.generateTemplate = generateTemplate;
exports.produceGzipFile = produceGzipFile;
