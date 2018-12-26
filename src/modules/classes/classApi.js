import axios from 'axios';
import * as env from '../../constants/env';


export function changeLinkDriver(classId, link) {
    //manageapi.keetool.xyz/class/1076/link-drive?token=
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/class/" + classId + "/link-drive?token=" + token;
    return axios.put(url, {link_drive: link});
}

export function loadExcelData(genid) {
    //http://api.keetool.xyz/apiv2/gens/10/classes?token=
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/apiv2/gens/" + genid + "/classes?token=" + token;
    return axios.get(url);
}

export function loadGens() {
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/gens?token=" + token;
    return axios.get(url);
}


export function loadClasses(search, page = 1, teacherId = '', genId = '') {
    let url = env.MANAGE_API_URL;
    switch (env.TYPE_API) {
        case 'alibaba':
            url += '/alibaba/class/all';
            break;
        default:
            url += "/class/all";
            break;
    }
    url += "?search=" + search + "&teacher_id=" + teacherId + "&page=" + page + "&gen_id=" + (genId === 0 ? '' : genId);
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteClass(classId) {
    let url = env.MANAGE_API_URL;
    switch (env.TYPE_API) {
        case 'alibaba':
            url += '/alibaba/class/delete';
            break;
        default:
            url += "/class/delete";
            break;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        'class_id': classId
    });
}

export function duplicateClass(classId) {
    let url = env.MANAGE_API_URL + "/class/duplicate/" + classId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeClassStatus(classId) {
    let url = env.MANAGE_API_URL + `/class/change-status`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        'class_id': classId
    });
}

export function infoCreateClass() {
    let url = env.MANAGE_API_URL + "/class/info-create-class";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function addClass(classData) {
    let url = env.MANAGE_API_URL + `/class/store-class`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        'id': classData.id,
        'datestart': classData.datestart,
        'name': classData.name,
        'schedule_id': classData.schedule_id,
        'room_id': classData.room_id,
        'description': classData.description,
        'gen_id': classData.gen_id,
        'target': classData.target,
        'regis_target': classData.regis_target,
        'course_id': classData.course_id,
        'teaching_assistant_id': classData.teacher_assis_id,
        'teacher_id': classData.teacher_id,
        'study_time': classData.study_time,
        'type': classData.type,
        'status': classData.status,
        'teachers': classData.teachers,
        'teaching_assistants': classData.teaching_assistants,

    });
}

export function loadClass(classId) {
    let url = env.MANAGE_API_URL + `/class/${classId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadTeachers(classId) {
    let url = env.MANAGE_API_URL + `/class/teachers/${classId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadTeachingLessons(classLessonId, type) {
    let url;

    if (type === 1) {
        url = env.MANAGE_API_URL + `/class/teachers-lesson/${classLessonId}`;
    } else {
        url = env.MANAGE_API_URL + `/class/teaching-assistants-lesson/${classLessonId}`;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function changeClassLesson(classLesson) {
    let url = env.MANAGE_API_URL + `/class/change-class-lesson`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, {
        'id': classLesson.id,
        'note': classLesson.note,
        'time': classLesson.time,
    });
}

export function changeTeacher(classLesson) {
    let url = env.MANAGE_API_URL + `/class/change-teacher`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, {
        'id': classLesson.id,
        'staff_id': classLesson.staffId,
        'note': classLesson.note,
    });
}

export function changeTeachingAssistant(classLesson) {
    let url = env.MANAGE_API_URL + `/class/change-teaching-assistant`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, {
        'id': classLesson.id,
        'staff_id': classLesson.staffId,
        'note': classLesson.note,
    });
}

export function loadStaffs() {
    let url = env.MANAGE_API_URL + `/class/staffs`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function changeTeachingLesson(classLessonId, oldTeachingId, newTeachingId, note) {
    let url = env.MANAGE_API_URL + `/class/change-teaching-lesson`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            class_lesson_id: classLessonId,
            old_teaching_id: oldTeachingId,
            new_teaching_id: newTeachingId,
            note: note,
        });
}