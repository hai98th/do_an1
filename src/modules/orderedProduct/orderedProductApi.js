import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllOrders(page = 1, searches, startTime, endTime, status, staff_id, user_id, queries) {
	let url = env.MANAGE_API_URL + '/order/delivery?limit=20&page=' + page;
	if (searches) {
		let l = JSON.stringify(searches);
		url += '&searches=' + l;
	}
	if (startTime && endTime) {
		url += `&start_time=${startTime}&end_time=${endTime}`;
	}
	let token = localStorage.getItem('token');
	if (token) {
		url += '&token=' + token;
	}
	if (staff_id) {
		url += `&staff_id=${staff_id}`;
	}
	if (user_id) {
		url += `&user_id=${user_id}`;
	}
	if (status) {
		url += `&status=${status}`;
	}
	if (queries) {
		let l = JSON.stringify(queries);
		url += '&queries=' + l;
	}
	return axios.get(url);
}

export function loadOrderInfo(page = 1, search, startTime, endTime, status, staff_id, user_id) {
	let url = env.MANAGE_API_URL + '/order/delivery-info?page=' + page;
	if (search) {
		url += `&search=${search}`;
	}
	if (startTime && endTime) {
		url += `&start_time=${startTime}&end_time=${endTime}`;
	}
	let token = localStorage.getItem('token');
	if (token) {
		url += '&token=' + token;
	}
	if (staff_id) {
		url += `&staff_id=${staff_id}`;
	}
	if (user_id) {
		url += `&user_id=${user_id}`;
	}
	if (status) {
		url += `&status=${status}`;
	}
	return axios.get(url);
}

export function getAllStaffApi() {
	let url = env.MANAGE_API_URL + '/staff?limit=-1';
	let token = localStorage.getItem('token');
	if (token) {
		url += '&token=' + token;
	}
	return axios.get(url);
}

export function editNote(order) {
	let token = localStorage.getItem('token');
	let url = env.MANAGE_API_URL + '/order/delivery/' + order.id + '/change-note?token=' + token;
	return axios.put(url, {
		note: order.note
	});
}

export function changeStatusApi(status, deliveryOrders, note) {
	let url = env.MANAGE_API_URL + '/order/delivery/change-status';
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	if (note) {
		return axios.post(url, {
			delivery_orders: JSON.stringify(deliveryOrders),
			status: status,
			note: note
		});
	}
	return axios.post(url, {
		delivery_orders: JSON.stringify(deliveryOrders),
		status: status
	});
}

export function sendPriceApi(orders) {
	let url = env.MANAGE_API_URL + '/order/delivery/send-price';
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	return axios.post(url, {
		delivery_orders: JSON.stringify(orders)
	});
}

export function loadAllCurrenciesApi() {
	let url = env.MANAGE_API_URL + '/v2/currency';
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	return axios.get(url);
}

export function chooseWalletApi(order, wallet) {
	let url = env.MANAGE_API_URL + '/order/delivery/' + order.id + '/pay';
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	return axios.post(url, {
		deposit: wallet,
		money: order.money
	});
}

export function loadAllOrderGoodNoPaging(searches, startTime, endTime, status, staff_id, user_id, queries) {
	let url = env.MANAGE_API_URL + '/order/delivery?limit=-1';
	if (searches) {
		let l = JSON.stringify(searches);
		url += '&searches=' + l;
	}
	if (startTime && endTime) {
		url += `&start_time=${startTime}&end_time=${endTime}`;
	}
	let token = localStorage.getItem('token');
	if (token) {
		url += '&token=' + token;
	}
	if (staff_id) {
		url += `&staff_id=${staff_id}`;
	}
	if (user_id) {
		url += `&user_id=${user_id}`;
	}
	if (status) {
		url += `&status=${status}`;
	}
	if (queries) {
		let l = JSON.stringify(queries);
		url += '&queries=' + l;
	}
	return axios.get(url);
}
