import React, {PureComponent, Component} from 'react';
	import './index.less';

	class hh extends (PureComponent || Component) {
		render () {
			const prefixCls = 'hh';
			return (
				<div className= {prefixCls}> Hello World </div>
			);
		}
	}

	export default hh;
	