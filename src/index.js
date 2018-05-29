import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Layout from './routes/layout';
import Login from './routes/login';
import GoLogin from './components/GoLogin';
import { routes } from './routes';

ReactDOM.render((
	<HashRouter>
		<Switch>
		 	<Route exact path="/login" component={Login}></Route>		
			{/* <Route component={Home}></Route> */}
			<Layout>
				{/* {!!noLogin&&<GoLogin />} */}
				<Switch>
					{
						routes.map((item, i) => {
							return <Route exact={item.exact} path={item.path} component={item.component} key={i}></Route>
						})
					}
				</Switch>
			</Layout>
		</Switch>
	</HashRouter>
), document.getElementById('app'));