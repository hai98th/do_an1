import initialState from "../../reducers/initialState";
import * as types from "./prj1Actionstyle";

export default function filmReducer(state = initialState.prj1, action) {
    switch (action.type) {
        case types.TAB_CHOSE:
            return {
                ...state,
                tabChose: action.tabChose
            };
        case types.LOAD_PERSONNEL_SUCCESS:
            return {
                ...state,
                personnel: action.personnel
            };
        case types.OPEN_PERSONNEL_MODAL:
            return{
                ...state,
                personnelModal: !state.personnelModal
            };
        case types.HANDLE_PERSONNEL_MODAL:
            return{
                ...state,
                handlePersonnelModal: action.psn
            };
        case types.BEGIN_SAVE_PERSONNEL:
            return{
                ...state,
                isAddEditPersonnel: true
            };
        case types.SAVE_PERSONNEL_SUCCESS:
            return{
                ...state,
                isAddEditPersonnel: false,
                personnelModal: false
            };



        case types.LOAD_ROOM_SUCCESS:
            return{
                ...state,
                room: action.room
            };
        case types.OPEN_ROOM_MODAL:
            return{
                ...state,
                roomModal: !state.roomModal
            };
        case types.HANDLE_ROOM_MODAL:
            return{
                ...state,
                handleRoomModal: action.room
            };
        case types.BEGIN_SAVE_ROOM:
            return{
                ...state,
                isAddEditRoom: true
            };
        case types.SAVE_ROOM_SUCCESS:
            return{
                ...state,
                isAddEditRoom: false,
                roomModal: false
            };



        case types.LOAD_MEETING_SUCCESS:
            return{
                ...state,
                meeting: action.meeting
            };
        case types.OPEN_MEETING_MODAL:
            return{
                ...state,
                meetingModal: !state.meetingModal
            };
        case types.HANDLE_MEETING_MODAL:
            return{
                ...state,
                handleMeetingModal: action.mt
            };
        case types.BEGIN_SAVE_MEETING:
            return{
                ...state,
                isAddEditMeeting: true
            };
        case types.SAVE_MEETING_SUCCESS:
            return{
                ...state,
                isAddEditMeeting: false,
                meetingModal: false
            };



        case types.LOAD_DETAIL_SUCCESS:
            return{
                ...state,
                detail: action.detail
            };
        case types.OPEN_DETAIL_MODAL:
            return{
                ...state,
                detailModal: !state.detailModal
            };
        case types.HANDLE_DETAIL_MODAL:
            return{
                ...state,
                handleDetailModal: action.mt
            };
        case types.BEGIN_SAVE_DETAIL:
            return{
                ...state,
                isAddEditDetail: true
            };
        case types.SAVE_DETAIL_SUCCESS:
            return{
                ...state,
                isAddEditDetail: false,
                detailModal: false
            };
        default:
            return state;
    }
}