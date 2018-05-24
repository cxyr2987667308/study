import HomePage from './routes/home';

import UserListPage from './functions/UserList';
import UserAddPage from './functions/UserAdd';
import UserEditPage from './functions/UserEdit';

import BookListPage from './functions/BookList';
import BookAddPage from './functions/BookAdd';
import BookEditPage from './functions/BookEdit';



const routes = [
	{
		title: 'Welcome',
		path: '/',
		exact: true,
		component: HomePage
	},{
		title: '用户列表',
		path: '/user/list',
		exact: false,
		component: UserListPage
	},{
		title: '新增用户',
		path: '/user/add',
		exact: false,
		component: UserAddPage
	},{
		title: '编辑用户',
		path: '/user/edit/:id',
		exact: false,
		component: UserEditPage
	},{
		title: '图书列表',
		path: '/book/list',
		exact: false,
		component: BookListPage
	},{
		title: '新增图书',
		path: '/book/add',
		exact: false,
		component: BookAddPage
	},{
		title: '编辑图书',
		path: '/book/edit/:id',
		exact: false,
		component: BookEditPage
	}
]

// 导出配置
export {
	routes
}