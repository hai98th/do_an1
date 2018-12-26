import * as types from "../../constants/actionTypes";
import initialState from "../../reducers/initialState";
import {
    UPLOAD_ROOM_COVER_COMPLETED,
    UPDATE_ROOM_COVER_PROGRESS,
    BEGIN_UPLOAD_ROOM_COVER,
} from "./roomActionType";

export default function roomsReducer(state = initialState.rooms, action) {
    switch (action.type) {
        case UPLOAD_ROOM_COVER_COMPLETED:
            return {
                ...state,
                room: {
                    ...state.room,
                    cover_url: action.cover_url,
                },
                isUploadingCover: false,
            };
        case UPDATE_ROOM_COVER_PROGRESS:
            return {
                ...state,
                coverPercentUploaded: action.coverPercentUploaded,
            };
        case BEGIN_UPLOAD_ROOM_COVER:
            return {
                ...state,
                coverPercentUploaded: 0,
                isUploadingCover: true,
            };

        case types.BEGIN_LOAD_ROOMS_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                },
            };
        case types.LOAD_ROOMS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    rooms: action.rooms,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                },
            };
        case types.LOAD_ROOMS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                },
            };
        case types.BEGIN_LOAD_BASES_ROOM_DATA:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false,
                },
            };
        case types.LOAD_BASES_ROOM_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                },
            };
        case types.LOAD_BASES_ROOM_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true,
                },
            };
        case types.BEGIN_STORE_ROOM_DATA:
            return {
                ...state,
                ...{
                    isStoringRoom: true,
                    errorStoreRoom: false,
                },
            };
        case types.STORE_ROOM_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isStoringRoom: false,
                    errorStoreRoom: false,
                },
            };
        case types.STORE_ROOM_DATA_ERROR:
            return {
                ...state,
                ...{
                    isStoringRoom: false,
                    errorStoreRoom: true,
                    showEditRoomModal: false,
                },
            };
        case types.TOGGLE_ROOM_EDIT_MODAL:
            return {
                ...state,
                showEditRoomModal: !state.showEditRoomModal,
            };
        case types.HANDLE_ROOM_EDIT_MODAL:
            return {
                ...state,
                room: action.room,
            };
        case types.UPLOAD_ROOM_AVATAR_COMPLETE:
            return {
                ...state,
                room: {
                    ...state.room,
                    avatar_url: action.avatar_url,
                },
                isUploadingAvatar: false,
            };
        case types.UPDATE_ROOM_AVATAR_PROGRESS:
            return {
                ...state,
                percent: action.percent,
            };
        case types.BEGIN_UPLOAD_ROOM_AVATAR:
            return {
                ...state,
                percent: 0,
                isUploadingAvatar: true,
            };
        case types.BEGIN_UPLOAD_IMAGE_ROOM:
            return {
                ...state,
                percent: 0,
                isUploadingImage: true,
            };
        case types.UPLOAD_IMAGE_COMPLETE_ROOM: {
            let images_url = [];
            if (state.room.images_url)
                images_url = JSON.parse(state.room.images_url);
            if (action.length + action.first_length === images_url.length + 1) {
                return {
                    ...state,
                    isUploadingImage: false,
                    room: {
                        ...state.room,
                        images_url: JSON.stringify([
                            ...images_url,
                            action.image,
                        ]),
                    },
                };
            } else {
                return {
                    ...state,
                    room: {
                        ...state.room,
                        images_url: JSON.stringify([
                            ...images_url,
                            action.image,
                        ]),
                    },
                    isUploadingImage: true,
                };
            }
        }
        case types.DELETE_IMAGE_ROOM: {
            let images_url = JSON.parse(state.room.images_url);
            return {
                ...state,
                room: {
                    ...state.room,
                    images_url: JSON.stringify(
                        images_url.filter(image => image !== action.image),
                    ),
                },
            };
        }
        case types.EDIT_ROOM_DATA_SUCCESS:
            return {
                ...state,
                isStoringRoom: false,
                showEditRoomModal: false,
                errorStoreRoom: false,
            };
        case types.BEGIN_LOAD_TYPES_ROOM_DATA:
            return {
                ...state,
                isLoadingRoomTypes: true
            };
        case types.LOAD_TYPES_ROOM_DATA_SUCCESS:
            return {
                ...state,
                types: action.types,
                isLoadingRoomTypes: false
            };
        case types.TOGGLE_ROOM_TYPE_MANAGE_MODAL:
            return {
                ...state,
                roomTypeManageModal: !state.roomTypeManageModal
            };
        default:
            return state;
    }
}
