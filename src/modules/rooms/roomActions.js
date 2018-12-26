import * as types from "../../constants/actionTypes";
import * as roomApi from "./roomApi";
import * as helper from "../../helpers/helper";
import {
    UPLOAD_ROOM_COVER_COMPLETED,
    UPDATE_ROOM_COVER_PROGRESS,
    BEGIN_UPLOAD_ROOM_COVER,
} from "./roomActionType";

/*eslint no-console: 0 */

export function loadBasesData() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_BASES_ROOM_DATA});
        roomApi
            .getBases()
            .then(function (res) {
                dispatch({
                    type: types.LOAD_BASES_ROOM_DATA_SUCCESS,
                    bases: res.data.data.bases,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_BASES_ROOM_DATA_ERROR,
                });
            });
    };
}

export function getTypes(search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TYPES_ROOM_DATA,
        });
        roomApi.getTypesApi(search).then(function (res) {
            dispatch({
                type: types.LOAD_TYPES_ROOM_DATA_SUCCESS,
                types: res.data.data.room_types,
            });
        });
    };
}

export function createRoomType(roomType) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING,
        });
        roomApi.createRoomTypeApi(roomType).then(function (res) {
            if (res.data.status) {
                dispatch(getTypes());
                if (roomType.id) {
                    helper.showNotification("Đã chỉnh sửa " +  roomType.name);
                }
                else {
                    helper.showNotification("Tạo loại phòng mới thành công");
                }
            } else {
                helper.showErrorNotification(res.data.message);
            }
            dispatch({
                type: types.HIDE_GLOBAL_LOADING,
            });
        });
    };
}

export const changeCover = file => {
    return dispatch => {
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = event => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh cover thành công");
            dispatch({
                type: UPLOAD_ROOM_COVER_COMPLETED,
                cover_url: data.url,
            });
        };
        const progressHandler = event => {
            const percentComplete = Math.round(
                100 * event.loaded / event.total,
            );
            dispatch({
                type: UPDATE_ROOM_COVER_PROGRESS,
                coverPercentUploaded: percentComplete,
            });
        };

        dispatch({
            type: BEGIN_UPLOAD_ROOM_COVER,
        });
        roomApi.changeAvatarApi(file, completeHandler, progressHandler, error);
    };
};

export function changeAvatar(file) {
    return function (dispatch) {
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = event => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_ROOM_AVATAR_COMPLETE,
                avatar_url: data.url,
            });
        };
        const progressHandler = event => {
            const percentComplete = Math.round(
                100 * event.loaded / event.total,
            );
            dispatch({
                type: types.UPDATE_ROOM_AVATAR_PROGRESS,
                percent: percentComplete,
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_ROOM_AVATAR,
        });
        roomApi.changeAvatarApi(file, completeHandler, progressHandler, error);
    };
}

export function changeImage(file, length, first_length) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_ROOM,
        });
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = event => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh thành công");
            dispatch({
                type: types.UPLOAD_IMAGE_COMPLETE_ROOM,
                image: data.url,
                length,
                first_length,
            });
        };
        const progressHandler = event => {
            const percentComplete = Math.round(
                100 * event.loaded / event.total,
            );
            dispatch({
                type: types.UPDATE_ROOM_AVATAR_PROGRESS,
                percent: percentComplete,
            });
        };
        roomApi.changeAvatarApi(file, completeHandler, progressHandler, error);
    };
}

export function loadRoomsData(page, search, baseId,limit) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ROOMS_DATA});
        roomApi
            .getRooms(page, search, baseId,limit)
            .then(function (res) {
                dispatch({
                    type: types.LOAD_ROOMS_DATA_SUCCESS,
                    rooms: res.data.rooms,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_ROOMS_DATA_ERROR,
                });
            });
    };
}

export function deleteImage(image) {
    return {
        type: types.DELETE_IMAGE_ROOM,
        image,
    };
}

export function storeRoom(room) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_STORE_ROOM_DATA});
        helper.showTypeNotification("Đang tạo phòng học", "info");
        roomApi.storeRoom(room).then(function (res) {
            if (res.data.status) {
                helper.showNotification("Tạo phòng học thành công.");
                dispatch({
                    type: types.EDIT_ROOM_DATA_SUCCESS,
                });
            } else {
                dispatch({
                    type: types.STORE_ROOM_DATA_ERROR,
                });
                helper.showTypeNotification(
                    res.data.message.message,
                    "warning",
                );
            }
        });
    };
}

export function editRoom(room) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_STORE_ROOM_DATA});
        helper.showTypeNotification("Đang sửa phòng học", "info");
        roomApi.editRoom(room).then(function (res) {
            if (res.data.status) {
                helper.showNotification("Sửa phòng học thành công.");
                dispatch({
                    type: types.EDIT_ROOM_DATA_SUCCESS,
                });
            } else {
                dispatch({
                    type: types.STORE_ROOM_DATA_ERROR,
                });
                helper.showTypeNotification(
                    res.data.message.message,
                    "warning",
                );
            }
        });
    };
}

export function showRoomEditModal() {
    return {
        type: types.TOGGLE_ROOM_EDIT_MODAL,
    };
}

export function handleRoomEditModal(room) {
    return {
        type: types.HANDLE_ROOM_EDIT_MODAL,
        room,
    };
}

export function showRoomTypeManageModal() {
    return {
        type: types.TOGGLE_ROOM_TYPE_MANAGE_MODAL,
    };
}
