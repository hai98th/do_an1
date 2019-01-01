import RoomContainer from "./modules/RoomContainer";
import PersonnelContainer from "./modules/PersonnelContainer";
import MeetingContainer from "./modules/MeetingContainer";
import DetailContainer from "./modules/DetailContainer";

export const router = [
    {
        path:'/room',
        component: RoomContainer
    },
    {
        path:'/personnel',
        component: PersonnelContainer
    },
    {
        path:'/meeting',
        component: MeetingContainer
    },
    {
        path:'/detail/:meetingId',
        component: DetailContainer
    },
];