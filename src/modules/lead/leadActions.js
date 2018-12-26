import * as types from '../../constants/actionTypes';
import * as leadApi from './leadApi';
import {showErrorNotification, showNotification} from "../../helpers/helper";
import async from "async";

/*eslint no-console: 0 */
export function getLeads(page, search, startTime, endTime, staffId, rate, top) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_LIST_LEAD});
        leadApi.loadLeads(page, search, startTime, endTime, staffId, rate, top)
            .then(res => {
                dispatch({
                    type: types.LOAD_LIST_LEAD_SUCCESS,
                    leads: res.data.leads,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    totalCount: res.data.paginator.total_count,
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_LIST_LEAD_ERROR});
            });
    };
}

export function uploadLeads(leads) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_LIST_LEAD});
        leadApi.uploadLeads(leads)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.UPLOAD_LIST_LEAD_SUCCESS,
                    });
                    showNotification("Upload thành công");
                } else {
                    showErrorNotification(res.data.message);
                    dispatch({type: types.UPLOAD_LIST_LEAD_ERROR});
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra. Thử lại");
                dispatch({type: types.UPLOAD_LIST_LEAD_ERROR});
            });
    };
}

export function editInfoLead(lead, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_INFO_LEAD});
        leadApi.editInfoLead(lead)
            .then(res => {
                if (res.data.status == 1) {
                    closeModal();
                    dispatch({
                        type: types.EDIT_INFO_LEAD_SUCCESS,
                        lead: res.data.data.lead
                    });
                    showNotification("Sửa thành công");
                } else {
                    showErrorNotification(res.data.message);
                    dispatch({type: types.EDIT_INFO_LEAD_ERROR});
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra. Thử lại");
                dispatch({type: types.EDIT_INFO_LEAD_ERROR});
            });
    };
}

export function uploadDistributionLead(leadIds, carerId, isAll, search, startTime, endTime, staffId, rate, top, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_DISTRIBUTION_LEAD});

        async.waterfall([
            function (callback) {
                if (isAll) {
                    leadApi.loadLeadWithIds(search, startTime, endTime, staffId, rate, top)
                        .then((res) => {
                            callback(null, res.data.data.lead_ids);
                        }).catch(() => {
                        callback("Có lỗi xảy ra");
                    });
                } else {
                    callback(null, leadIds);
                }
            },
            function (leadIds, callback) {
                leadApi.uploadDistributionLead(leadIds, carerId)
                    .then(res => {
                        if (res.data.status === 1) {
                            showNotification("Phân leads thành công");
                            closeModal();
                            dispatch({
                                type: types.UPLOAD_DISTRIBUTION_LEAD_SUCCESS,
                            });
                            callback(null);
                        } else {
                            callback(res.data.message);
                        }
                    })
                    .catch(() => {
                        callback("Có lỗi xảy ra");
                    });
            }

        ], function (err) {
            if (err) {
                showErrorNotification(err);
                dispatch({
                    type: types.UPLOAD_DISTRIBUTION_LEAD_ERROR,
                });
            }
        });

    };
}