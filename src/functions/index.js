
	import React from 'react';
	import Loadable from 'react-loadable';
	import { Loading } from 'components';

	const Spin = () => <Loading loading />;
	
		const HhHh = Loadable({
			loader: () => import('./hh-hh/index.module.js'),
			loading: Spin
		});

		const HhHhRoutes = require('./hh-hh/config').routes;
	
	let exportModules = {'hh-hh': HhHh,};
	let exportRoutes =Object.assign({},HhHhRoutes,);
	
	export {exportModules,exportRoutes};