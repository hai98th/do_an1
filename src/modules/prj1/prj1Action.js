import * as types from "./prj1Actionstyle";
import * as prj1Api from "./prj1Api";
import * as helper from "../../helpers/helper";




export function tabChose(number) {
    return function (dispatch) {
        dispatch({
            type: types.TAB_CHOSE,
            tabChose: number
        });
    };

}



export function getPersonnel() {
    return function (dispatch) {
        prj1Api.getPersonnelApi()
            .then((res)=>{
                dispatch({
                    type: types.LOAD_PERSONNEL_SUCCESS,
                    personnel: res.data.personnel
                });
            });
    };
}
export function openPersonnelModal() {
    return function (dispatch) {
        dispatch({
            type:types.OPEN_PERSONNEL_MODAL
        });
    };
}
export function handlePersonnelModal(psn) {
    return function (dispatch) {
        dispatch({
           type: types.HANDLE_PERSONNEL_MODAL,
           psn
        });
    };
}
export function creatPersonnel(psn) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_PERSONNEL
        });
        prj1Api.creatPersonnelApi(psn)
            .then((res)=>{
                if(res){
                    helper.showNotification("Tạo nhân sự mới thành công");
                    dispatch({
                        type: types.SAVE_PERSONNEL_SUCCESS,
                    });

                }
            });
    };
}
export function editPersonnel(psn) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_PERSONNEL
        });
        prj1Api.editPersonnelApi(psn)
            .then((res)=>{
                if(res){
                    helper.showNotification("Chỉnh sủa nhân sự thành công");
                    dispatch({
                        type: types.SAVE_PERSONNEL_SUCCESS,
                    });

                }
            });
    };
}
export function deletePersonnel(id) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        dispatch({
            type: types.BEGIN_SAVE_PERSONNEL
        });
        prj1Api.deletePersonnelApi(id)
            .then(function (res) {
                if (res) {
                    helper.showNotification("Xóa nhân sự thành công");
                    dispatch({
                        type: types.SAVE_PERSONNEL_SUCCESS
                    });
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}



export function getRoom() {
    return function (dispatch) {
        prj1Api.getRoomApi()
            .then((res)=>{
                dispatch({
                    type: types.LOAD_ROOM_SUCCESS,
                    room: res.data.room
                });
            });
    };
}
export function openRoomModal() {
    return function (dispatch) {
        dispatch({
            type:types.OPEN_ROOM_MODAL
        });
    };
}
export function handleRoomModal(room) {
    return function (dispatch) {
        dispatch({
            type: types.HANDLE_ROOM_MODAL,
            room
        });
    };
}
export function creatRoom(room) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_ROOM
        });
        prj1Api.creatRoomlApi(room)
            .then((res)=>{
                if(res){
                    helper.showNotification("Tạo phòng mới thành công");
                    dispatch({
                        type: types.SAVE_ROOM_SUCCESS,
                    });

                }
            });
    };
}
export function editRoom(psn) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_ROOM
        });
        prj1Api.editRoomApi(psn)
            .then((res)=>{
                if(res){
                    helper.showNotification("Chỉnh sủa phòng thành công");
                    dispatch({
                        type: types.SAVE_ROOM_SUCCESS,
                    });

                }
            });
    };
}
export function deleteRoom(id) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        dispatch({
            type: types.BEGIN_SAVE_ROOM
        });
        prj1Api.deleteRoomApi(id)
            .then(function (res) {
                if (res) {
                    helper.showNotification("Xóa phòng thành công");
                    dispatch({
                        type: types.SAVE_ROOM_SUCCESS
                    });
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}



export function getMeeting() {
    return function (dispatch) {
        prj1Api.getMeetingApi()
            .then((res)=>{
                dispatch({
                    type: types.LOAD_MEETING_SUCCESS,
                    meeting: res.data.meeting
                });
            });
    };
}
export function openMeetingModal() {
    return function (dispatch) {
        dispatch({
            type:types.OPEN_MEETING_MODAL
        });
    };
}
export function handleMeetingModal(mt) {
    return function (dispatch) {
        dispatch({
            type: types.HANDLE_MEETING_MODAL,
            mt
        });
    };
}
export function creatMeeting(mt) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_MEETING
        });
        prj1Api.creatMeetinglApi(mt)
            .then((res)=>{
                if(res){
                    helper.showNotification("Tạo cuộc họp mới thành công");
                    dispatch({
                        type: types.SAVE_MEETING_SUCCESS,
                    });

                }
            });
    };
}
export function editMeeting(mt) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_MEETING
        });
        prj1Api.editMeetingApi(mt)
            .then((res)=>{
                if(res){
                    helper.showNotification("Chỉnh sủa cuộc họp thành công");
                    dispatch({
                        type: types.SAVE_MEETING_SUCCESS,
                    });

                }
            });
    };
}
export function deleteMeeting(id) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        dispatch({
            type: types.BEGIN_SAVE_MEETING
        });
        prj1Api.deleteMeetingApi(id)
            .then(function (res) {
                if (res) {
                    helper.showNotification("Xóa cuộc họp thành công");
                    dispatch({
                        type: types.SAVE_MEETING_SUCCESS
                    });
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}



export function getDetail(id) {
    return function (dispatch) {
        prj1Api.getDetailApi(id)
            .then((res)=>{
                dispatch({
                    type: types.LOAD_DETAIL_SUCCESS,
                    detail: res.data.detail
                });
            });
    };
}
export function openDetailModal() {
    return function (dispatch) {
        dispatch({
            type:types.OPEN_DETAIL_MODAL
        });
    };
}
export function handleDetailModal(mt) {
    return function (dispatch) {
        dispatch({
            type: types.HANDLE_DETAIL_MODAL,
            mt
        });
    };
}
export function creatDetail(id,mt) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_DETAIL
        });
        prj1Api.creatDetaillApi(id,mt)
            .then((res)=>{
                if(res){
                    helper.showNotification("Tạo mới thành công");
                    dispatch({
                        type: types.SAVE_DETAIL_SUCCESS,
                    });

                }
            });
    };
}
export function editDetail(id,mt) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_DETAIL
        });
        prj1Api.editDetailApi(id,mt)
            .then((res)=>{
                if(res){
                    helper.showNotification("Chỉnh sủa thành công");
                    dispatch({
                        type: types.SAVE_DETAIL_SUCCESS,
                    });

                }
            });
    };
}
export function deleteDetail(id, id2) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        dispatch({
            type: types.BEGIN_SAVE_DETAIL
        });
        prj1Api.deleteDetailApi(id, id2)
            .then(function (res) {
                if (res) {
                    helper.showNotification("Xóa thành công");
                    dispatch({
                        type: types.SAVE_DETAIL_SUCCESS
                    });
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}