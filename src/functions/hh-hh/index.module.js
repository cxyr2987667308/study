/**
	* creator:
	* date: 2018-5-29 15:29:58
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
	