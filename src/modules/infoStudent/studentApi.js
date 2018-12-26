import axios from 'axios';
import * as env from '../../constants/env';

export function loadRegisters(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/registers`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadInfoStudent(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function historyCalls(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/history-calls`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadProgress(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/progress`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function editStudent(student) {
    let url = env.MANAGE_API_URL + `/student/${student.id}/edit`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
    });
}

export function changePassword(studentId, newPassword) {
    let url = env.MANAGE_API_URL + '/change-password-student';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: studentId,
        new_password: newPassword,
    });
}