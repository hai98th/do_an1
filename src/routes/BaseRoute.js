import BasesContainer from "../modules/bases/BasesContainer";
import RoomsContainer from "../modules/rooms/RoomsContainer";
import CreateBaseContainer from "../modules/bases/CreateBaseContainer";
import UserpackContainer from "../modules/userpack/UserpackContainer";
import RoomDetailContainer from "../modules/bases/room/RoomDetailContainer";
import RegisterManageContainer from "../modules/registerManage/RegisterManageContainer";
import RegisterManageRoomContainer from "../modules/registerManageRoom/RegisterManageRoomContainer";
import RegisterManageMeetingRoomContainer from "../modules/registerManageMeetingRoom/container/RegisterManageMeetingRoomContainer";
import RoomRegisterListContainer from "../modules/roomRegisterListTrongDong/RoomRegisterListContainer";
import SeatTypeContainer from "../modules/ZgroupFilm/seatType/SeatTypeContainer";
import CodeContainer from "../modules/ZgroupFilm/code/CodeContainer";

/**
 * Tab Cơ sở
 */
export default [
    {
        // path: "/manage/bases",
        path: "/base/bases",
        component: BasesContainer
    },
    {
        // path: "/manage/rooms",
        path: "/base/rooms",
        component: RoomsContainer
    },
    {
        path: "base/create",
        component: CreateBaseContainer,
        type: "create"
    },
    {
        path: "/base/:baseId/edit",
        component: CreateBaseContainer,
        type: "edit"
    },
    {
        path: "/base/member-package",
        component: UserpackContainer,
    },
    {
        path: "/base/room/:roomId",
        component: RoomDetailContainer
    },
    {
        path: "base/registers",
        component: RegisterManageContainer
    },
    {
        path: "base/registers-room",
        component: RegisterManageRoomContainer
    },
    {
        path: "base/registers-meeting-room",
        component: RegisterManageMeetingRoomContainer
    },
    {
        path: "base/room-register-list",
        component: RoomRegisterListContainer
    },
    {
        path: "base/film/seat-type",
        component: SeatTypeContainer
    },
    {
        path: "base/film/code",
        component: CodeContainer
    },

];
