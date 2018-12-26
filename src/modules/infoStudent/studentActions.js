import * as types from '../../constants/actionTypes';
import * as studentApi from './studentApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadInfoStudent(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_INFO_STUDENT});
        studentApi.loadInfoStudent(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_INFO_STUDENT_SUCCESS,
                    student: res.data.data.student
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_INFO_STUDENT_ERROR});
            });
    };
}

export function loadRegisters(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_REGISTERS_INFO_STUDENT});
        studentApi.loadRegisters(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_REGISTERS_INFO_STUDENT_SUCCESS,
                    registers: res.data.data.registers
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_REGISTERS_INFO_STUDENT_ERROR});
            });
    };
}

export function loadHistoryCalls(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_HISTORY_CALLS_INFO_STUDENT});
        studentApi.historyCalls(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_HISTORY_CALLS_INFO_STUDENT_SUCCESS,
                    historyCalls: res.data.data.history_calls
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_HISTORY_CALLS_INFO_STUDENT_ERROR});
            });
    };
}

export function loadProgress(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_PROGRESS_INFO_STUDENT});
        studentApi.loadProgress(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_PROGRESS_INFO_STUDENT_SUCCESS,
                    progress: res.data.data.progress
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_PROGRESS_INFO_STUDENT_ERROR});
            });
    };
}

export function editInfoStudent(student, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_EDIT_INFO_STUDENT});
        studentApi.editStudent(student)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Cập nhật thông tin thành công.");
                    closeModal();
                    dispatch({
                        type: types.LOAD_EDIT_INFO_STUDENT_SUCCESS,
                        student: res.data.data.student
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({type: types.LOAD_EDIT_INFO_STUDENT_ERROR});
                }
            })
            .catch(() => {
                dispatch({type: types.LOAD_EDIT_INFO_STUDENT_ERROR});
            });
    };
}

export function changePassword(studentId, newPassword, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CHANGE_PASSWORD_STUDENT});
        studentApi.changePassword(studentId, newPassword)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification(res.data.data.message);
                    closeModal();
                    dispatch({type: types.CHANGE_PASSWORD_STUDENT_SUCCESS});

                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({type: types.CHANGE_PASSWORD_STUDENT_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Cập nhật thất bại");
                dispatch({type: types.CHANGE_PASSWORD_STUDENT_ERROR});
            });
    };
}
