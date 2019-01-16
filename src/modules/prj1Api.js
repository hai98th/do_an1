import axios from 'axios';



//personnel
export function getPersonnelApi() {
    return axios.get("http://192.168.4.57:5000/api/personnel");
}
export function creatPersonnelApi(psn) {

    return axios.post("http://192.168.4.57:5000/api/personnel",psn,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function editPersonnelApi(psn) {
    let url = "http://192.168.4.57:5000/api/personnel/id=" + psn.id;
    return axios.put(url,psn,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function deletePersonnelApi(id) {
    return axios.delete("http://192.168.4.57:5000/api/personnel/id="+id);
}



//meetingRoom
export function getRoomApi() {
    return axios.get("http://192.168.4.57:5000/api/room");
}
export function createRoomApi(room) {

    return axios.post("http://192.168.4.57:5000/api/room",room,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function editRoomApi(room) {
    let url = "http://192.168.4.57:5000/api/room/id=" + room.id;
    return axios.put(url,room,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function deleteRoomApi(id) {
    return axios.delete("http://192.168.4.57:5000/api/room/id="+id);
}



//meeting
export function getMeetingApi() {
    return axios.get("http://192.168.4.57:5000/api/meeting");
}
export function createMeetingApi(mt) {

    return axios.post("http://192.168.4.57:5000/api/meeting",mt,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function editMeetingApi(mt) {
    let url = "http://192.168.4.57:5000/api/meeting/id=" + mt.id;
    return axios.put(url,mt,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function deleteMeetingApi(id) {
    return axios.delete("http://192.168.4.57:5000/api/meeting/id="+id);
}



//detail
export function getDetailApi(id) {
    return axios.get("http://192.168.4.57:5000/api/detail_meeting/meeting_id="+id);
}
export function createDetailApi(id,mt) {

    return axios.post("http://192.168.4.57:5000/api/detail_meeting/meeting_id="+id,mt,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function editDetailApi(id,mt) {
    let url = "http://192.168.4.57:5000/api/detail_meeting/meeting_id=" +id +"/id="+ mt.id;
    return axios.put(url,mt,{
        headers: {
            'content-type': 'application/json'
        }
    });
}
export function deleteDetailApi(id,id2) {
    return axios.delete("http://192.168.4.57:5000/api/detail_meeting/meeting_id=" +id +"/id="+ id2);
}