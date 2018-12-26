import PersonnelContainer from "../modules/prj1/personnel/PersonnelContainer";
import MeetingRoomContainer from "../modules/prj1/meetingRoom/MeetingRoomContainer";
import MeetingContainer from "../modules/prj1/meeting/MeetingContainer";
import MeetingDetailContainer from "../modules/prj1/detail/DetailContainer";


export default [
    {
        path: "prj1/personnel",
        component: PersonnelContainer
    },
    {
        path: "prj1/meeting",
        component: MeetingContainer
    },
    {
        path: "prj1/meeting_room",
        component: MeetingRoomContainer
    },
    {
        path:"prj1/meeting/detail/:meetingId",
        component: MeetingDetailContainer
    }
];