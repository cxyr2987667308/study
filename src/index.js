import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './routes/login';
import HomeLayout from './components/HomeLayout';
import GoLogin from './components/GoLogin';
import HomePage from './routes/home'
import { routes } from './routes';

ReactDOM.render((
	<HashRouter>
		<Switch>
		 	<Route exact path="/login" component={Login}></Route>		
			{/* <Route component={Home}></Route> */}
			<HomeLayout>
				{/* {!!noLogin&&<GoLogin />} */}
				<Switch>
					<Route exact={true} path='/' component={HomePage}></Route>
					{
						routes.map((item, i) => {
							return <Route exact={item.exact} path={item.path} component={item.component} key={i}></Route>
						})
					}
				</Switch>
			</HomeLayout>
		</Switch>
	</HashRouter>
), document.getElementById('app'));