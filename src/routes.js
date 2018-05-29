// import HomePage from './functions/home';

// import UserListPage from './functions/user-list';
// import UserAddPage from './functions/user-add';
// import UserEditPage from './functions/user-edit';

// import BookListPage from './functions/book-list';
// import BookAddPage from './functions/book-add';
// import BookEditPage from './functions/book-edit';

import {Home, UserList, UserAdd, UserEdit, BookList, BookAdd, BookEdit} from './functions'



const routes = [
	{
		title: 'Welcome',
		path: '/',
		exact: true,
		component: Home
	},{
		title: '用户列表',
		path: '/user/list',
		exact: false,
		component: UserList
	},{
		title: '新增用户',
		path: '/user/add',
		exact: false,
		component: UserAdd
	},{
		title: '编辑用户',
		path: '/user/edit/:id',
		exact: false,
		component: UserEdit
	},{
		title: '图书列表',
		path: '/book/list',
		exact: false,
		component: BookList
	},{
		title: '新增图书',
		path: '/book/add',
		exact: false,
		component: BookAdd
	},{
		title: '编辑图书',
		path: '/book/edit/:id',
		exact: false,
		component: BookEdit
	}
]

// 导出配置
export {
	routes
}