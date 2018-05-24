import { Link } from 'react-router-dom';

export default function request(method, url, body){

	method = method.toUpperCase();
	if(method === 'GET'){
		// fetch的GET不允许有body,参数只能放在url中
		body = undefined;
	}else{
		body = body && JSON.stringify(body);
	}

	return fetch(url, {
		method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Token': sessionStorage.getItem('access_token') || ''
    },
    body
	})
	.then((res) => {
		if(res.status === 401){
			localStorage.setItem('noLogin', true);
			return Promise.reject('Unauthorized.');
		}else{
			const token =res.headers.get('access-token');
			if(token){
				sessionStorage.setItem('access_token', token);
			}
			localStorage.removeItem('noLogin');
			return res.json();
		}
	})
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);