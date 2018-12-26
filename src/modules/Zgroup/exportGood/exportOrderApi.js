
import axios    from 'axios';
import * as env from '../../../constants/env';


export function loadExportOrders(page,search) {
    //http://manageapi.keetool.xyz/company/export-order/all?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/all?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "page=" + page + "&search=" + search + "&token=" + token;
    }
    return axios.get(url);
}
export function loadExportOrdersNoPaging() {
    
    let url     = env.MANAGE_API_URL +"/company/export-order/no-paging?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=   "&token=" + token;
    }
    return axios.get(url);
}


export function loadAllGoods() {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/good/all/no-paging";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}

export function loadAllCompanies() {
    //http://manageapi.keetool.xyz/company/provided?token=
    let url     = env.MANAGE_API_URL +"/company/provided?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadAllWarehourses() {
    //http://manageapi.keetool.xyz/order/all-warehouses?token=
    let url     = env.MANAGE_API_URL +"/order/all-warehouses?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function createExportOrder(data) {
    //http://manageapi.keetool.xyz/company/export-order?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/" + data.id  ;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.post(url,data);
}

export function loadExportOrder(id) {
    //http://manageapi.keetool.xyz/company/export-order?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}

export function editExportOrder(data) {
    //http://manageapi.keetool.xyz/company/export-order?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/" + data.id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.put(url, data);
}

export function confirmOrder(id) {
    //http://manageapi.keetool.xyz/company/print-order/21?token=
    let url     = env.MANAGE_API_URL +"/company/item-order/" + id + "/change-status?status=3";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }

    return axios.post(url);
}

export function loadAllOrderedGood() {
    //http://manageapi.keetool.xyz/company/order/all?limit=-1&token=
    let url     = env.MANAGE_API_URL +"/company/be-ordered/all?limit=-1&filter=1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }

    return axios.get(url);
}