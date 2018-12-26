/**
 * Created by phanmduong on 9/21/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';
import * as classActions from '../classActions';
import Loading from "../../../components/common/Loading";
import AttendanceTeacher from './AttendanceTeacher';
import {Modal} from 'react-bootstrap';
import TooltipButton from '../../../components/common/TooltipButton';
import FormInputText from '../../../components/common/FormInputText';
import FormInputDate from '../../../components/common/FormInputDate';
import Select from 'react-select';
import PropTypes from 'prop-types';
import ItemReactSelect from '../../../components/common/ItemReactSelect';
import * as helper from '../../../helpers/helper';
import moment from "moment";
import {DATETIME_FORMAT, DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL} from '../../../constants/constants';
import {NO_AVATAR} from "../../../constants/env";

class ClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.classId = this.props.params.classId;
        this.path = '';
        this.state = {
            showModalClassLesson: false,
            showModalChangeTeacher: false,
            showModalChangeTeachAssis: false,
            showModalTeachingLesson: false,
            showModalChangeTeachingLesson: false,
            classLessonSelected: {},
            teacherSelected: {},
            teachAssisSelected: {},
            changeDate: {
                date: '',
                note: '',
            },
            changeTeachAssis: {
                id: '',
                note: ''
            },
            changeTeacher: {
                id: '',
                note: ''
            },
            changeTeachingLesson: {
                id: '',
                note: ''
            },
            staffs: [],
            linkDriver: "",
            typeTeachingLesson: 1,
            attendanceSelected: {},
            oldTeachingId: ''
        };
        this.closeModalClassLesson = this.closeModalClassLesson.bind(this);
        this.openModalClassLesson = this.openModalClassLesson.bind(this);
        this.closeModalTeachingLesson = this.closeModalTeachingLesson.bind(this);
        this.openModalTeachingLesson = this.openModalTeachingLesson.bind(this);
        this.closeModalChangeTeacher = this.closeModalChangeTeacher.bind(this);
        this.openModalChangeTeacher = this.openModalChangeTeacher.bind(this);
        this.closeModalChangeTeachingLesson = this.closeModalChangeTeachingLesson.bind(this);
        this.openModalChangeTeachingLesson = this.openModalChangeTeachingLesson.bind(this);
        this.closeModalTeachAssis = this.closeModalTeachAssis.bind(this);
        this.openModalTeachAssis = this.openModalTeachAssis.bind(this);
        this.changeClassLesson = this.changeClassLesson.bind(this);
        this.changeTeachingAssis = this.changeTeachingAssis.bind(this);
        this.changeTeacher = this.changeTeacher.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.exportAttendanceExcel = this.exportAttendanceExcel.bind(this);
        this.changeLinkDriver = this.changeLinkDriver.bind(this);
        this.submitLinkDriver = this.submitLinkDriver.bind(this);
        this.changeTeachingLesson = this.changeTeachingLesson.bind(this);
    }

    componentWillMount() {
        this.props.classActions.loadClass(this.classId);
        this.props.classActions.loadStaffs();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoadingClass && !nextProps.isLoadingClass) {
            this.setState({linkDriver: nextProps.class.link_drive});
        }
        if (nextProps.isLoadingStaffs !== this.props.isLoadingStaffs && !nextProps.isLoadingStaffs) {
            let dataStaffs = [];
            nextProps.staffs.forEach(staff => {
                dataStaffs.push({
                    ...staff, ...{
                        value: staff.id,
                        label: staff.name
                    }
                });
            });
            this.setState({staffs: dataStaffs});
        }
    }

    exportExcel() {

        let data = this.props.class.registers;
        let cols = [{"wch": 5}, {"wch": 22}, {"wch": 10}, {"wch": 10}, {"wch": 20}, {"wch": 12}, {"wch": 30}, {"wch": 16}, {"wch": 30}, {"wch": 25},];
        data = data.map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            let res = {
                'STT': index + 1,

                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường ĐH': item.student.university,
            };
            return res;
        });

        let wb = helper.newWorkBook();
        helper.appendJsonToWorkBook(data, wb, 'Danh sách học viên', cols);
        helper.saveWorkBookToExcel(wb, 'Danh sách học viên lớp ' + this.props.class.name);
    }

    exportAttendanceExcel() {
        let wb = helper.newWorkBook();
        let data = this.props.class.registers;
        let cols = [{"wch": 5}, {"wch": 22}, {"wch": 10}, {"wch": 10}, {"wch": 20}, {"wch": 12}, {"wch": 30}, {"wch": 16}, {"wch": 30}, {"wch": 25},];//độ rộng cột
        let colname = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];//danh sách cột cmt
        let cmts = [];// danh sách cmts
        //begin điểm danh
        data = this.props.class.registers.filter(item => (item.paid_status)).map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            let res = {
                'STT': index + 1,
                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường ĐH': item.student.university,
            };
            item.attendances.forEach((obj, index2) => {
                res = {...res, [`Buổi ${index2 + 1}`]: ((obj.status == 1) ? 'X' : '')};
                if (!helper.isEmptyInput(obj.note))
                    cmts = [...cmts, {cell: colname[index2] + (index + 2), note: obj.note}];
            });
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Điểm danh', cols, cmts);
        //end điểm danh

        //begin bài tập
        data = this.props.class.registers.filter(item => (item.paid_status)).map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            let res = {
                'STT': index + 1,
                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường ĐH': item.student.university,
            };
            item.attendances.forEach((obj, index2) => {
                res = {...res, [`Buổi ${index2 + 1}`]: ((obj.homework_status == 1) ? 'X' : '')};
            });
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Bài tập', cols, cmts);
        //end bài tập

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách điểm danh lớp ' + this.props.class.name);
    }

    closeModalClassLesson() {
        this.setState({showModalClassLesson: false});
    }

    openModalClassLesson(classLesson) {
        this.setState(
            {
                showModalClassLesson: true,
                classLessonSelected: classLesson,
                changeDate: {
                    date: classLesson.class_lesson_time,
                    note: ''
                }
            }
        );
    }

    closeModalTeachingLesson() {
        this.setState({showModalTeachingLesson: false});
    }

    openModalTeachingLesson(attendance, type) {
        this.setState(
            {
                showModalTeachingLesson: true,
                typeTeachingLesson: 1,
                attendanceSelected: attendance
            }
        );
        this.props.classActions.loadTeachingLessons(attendance.class_lesson_id, type);
    }

    closeModalChangeTeachingLesson() {
        this.setState({showModalChangeTeachingLesson: false});
    }

    openModalChangeTeachingLesson(teachingLesson) {
        this.setState(
            {
                showModalChangeTeachingLesson: true,
                changeTeachingLesson: {
                    id: teachingLesson.id
                },
                oldTeachingId: teachingLesson.id
            }
        );
    }

    closeModalChangeTeacher() {
        this.setState({showModalChangeTeacher: false});
    }

    openModalChangeTeacher(data) {
        this.setState(
            {
                showModalChangeTeacher: true,
                teacherSelected: data,
                changeTeacher: {
                    id: data.staff.id
                }
            }
        );
    }

    closeModalTeachAssis() {
        this.setState({showModalChangeTeachAssis: false});
    }

    openModalTeachAssis(data) {
        this.setState(
            {
                showModalChangeTeachAssis: true,
                teachAssisSelected: data,
                changeTeachAssis: {
                    id: data.staff.id
                }
            }
        );
    }

    changeClassLesson() {
        this.props.classActions.changeClassLesson({
            note: this.state.changeDate.note,
            time: this.state.changeDate.date,
            id: this.state.classLessonSelected.class_lesson_id,
        }, this.closeModalClassLesson);
    }

    changeTeacher() {
        this.props.classActions.changeTeacher({
            staffId: this.state.changeTeacher.id,
            note: this.state.changeTeacher.note,
            id: this.state.teacherSelected.class_lesson_id,
        }, this.closeModalChangeTeacher);
    }

    changeTeachingAssis() {
        this.props.classActions.changeTeachingAssistant({
            staffId: this.state.changeTeachAssis.id,
            note: this.state.changeTeachAssis.note,
            id: this.state.teachAssisSelected.class_lesson_id,
        }, this.closeModalTeachAssis);
    }

    changeLinkDriver(e) {
        const value = e.target.value;
        this.setState({linkDriver: value});
    }

    submitLinkDriver() {
        helper.showNotification("Đang lưu...");
        if (!this.props.isLoading)
            this.props.classActions.changeLinkDriver(this.classId, this.state.linkDriver);
    }

    changeTeachingLesson() {
        this.props.classActions.changeTeachingLesson(this.state.attendanceSelected.class_lesson_id, this.state.oldTeachingId,
            this.state.changeTeachingLesson.id, this.state.typeTeachingLesson,
            this.state.changeTeachingLesson.note, this.closeModalChangeTeachingLesson
        )
        ;
    }


    render() {
        this.path = this.props.location.pathname;
        let classData = this.props.class;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
                            <li className={this.path === `/teaching/class/${this.classId}` ? 'active' : ''}>
                                <IndexLink to={`/teaching/class/${this.classId}`}>
                                    <i className="material-icons">account_circle</i> Tổng quan  &#160;

                                    <div className="ripple-container"/>
                                </IndexLink>
                            </li>
                            <li className={this.path === `/teaching/class/${this.classId}/history-teaching` ? 'active' : ''}>
                                <Link to={`/teaching/class/${this.classId}/history-teaching`}>
                                    <i className="material-icons">smartphone</i> Lịch sử giảng dạy &#160;
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.path === `/teaching/class/${this.classId}/registers` ? 'active' : ''}>
                                <Link to={`/teaching/class/${this.classId}/registers`}>
                                    <i className="material-icons">create</i> Đăng kí &#160;
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.path === `/teaching/class/${this.classId}/progress` ? 'active' : ''}>
                                <Link to={`/teaching/class/${this.classId}/progress`}>
                                    <i className="material-icons">create</i> Học tập &#160;
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.path === `/teaching/class/${this.classId}/care` ? 'active' : ''}>
                                <Link to={`/teaching/class/${this.classId}/care`}>
                                    <i className="material-icons">flag</i> Quan tâm &#160;
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                        </ul>
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title">
                                                <strong>Thông tin về điểm danh</strong>
                                            </h4>
                                            <br/>
                                            <div className="col-md-12">
                                                <div>
                                                    {/*<button className="btn btn-default width-100" disabled>
                                                        <i className="material-icons">timer</i>
                                                        Xem group lớp
                                                    </button>
                                                    <button className="btn btn-default width-100" disabled>
                                                        <i className="material-icons">timer</i>
                                                        Xếp bằng
                                                    </button>
                                                    <button className="btn btn-default width-100" disabled>
                                                        <i className="material-icons">timer</i>
                                                        In bằng
                                                    </button>*/}
                                                    <button className="btn btn-default width-100"
                                                            onClick={this.exportExcel}
                                                            disabled={this.props.isLoadingClass}
                                                    >
                                                        <i className="material-icons">file_download</i>
                                                        Xuất danh sách
                                                    </button>
                                                    <button className="btn btn-default width-100"
                                                            onClick={this.exportAttendanceExcel}
                                                            disabled={this.props.isLoadingClass}
                                                    >
                                                        <i className="material-icons">file_download</i>
                                                        Xuất danh sách điểm danh
                                                    </button>
                                                    <FormInputText
                                                        name="link-driver"
                                                        label="Link Driver"
                                                        updateFormData={this.changeLinkDriver}
                                                        value={this.state.linkDriver}
                                                        type="text"
                                                        disabled={this.props.isLoadingClass || this.props.isLoading}
                                                    />
                                                    <a className="btn btn-rose btn-sm"
                                                       href={this.state.linkDriver}
                                                       target="_blank"
                                                    >
                                                        Mở link
                                                    </a>
                                                    <button className="btn btn-rose btn-sm"
                                                            onClick={this.submitLinkDriver}
                                                            disabled={this.props.isLoadingClass || this.props.isLoading}
                                                    >
                                                        Lưu
                                                    </button>
                                                </div>
                                                {this.props.isLoadingClass ? <Loading/> :
                                                    <div>
                                                        {classData.attendances &&
                                                        <div><h4><strong>Tình trạng điểm danh</strong></h4>
                                                            {classData.attendances.map(attendance => {
                                                                return (
                                                                    <div key={attendance.order}>
                                                                        <div
                                                                            className="flex flex-row-center flex-space-between">
                                                                            <h6>
                                                                                <strong>Buổi {attendance.order} </strong>{attendance.total_attendance}/{classData.total_paid}
                                                                            </h6>
                                                                            {
                                                                                attendance.is_change &&
                                                                                <TooltipButton placement="top"
                                                                                               text="Đổi buổi"
                                                                                >
                                                                                    <button className="btn btn-xs btn-round"
                                                                                            onClick={() => this.openModalClassLesson(attendance)}
                                                                                    >
                                                                                        <i className="material-icons">compare_arrows</i>
                                                                                        <div className="ripple-container"/>
                                                                                    </button>
                                                                                </TooltipButton>
                                                                            }
                                                                        </div>

                                                                        <div
                                                                            className="progress progress-line-success progress-bar-table width-100">
                                                                            <div
                                                                                className="progress-bar progress-bar-success"
                                                                                role="progressbar"
                                                                                aria-valuemin="0"
                                                                                aria-valuemax="100"
                                                                                style={{width: (100 * attendance.total_attendance / classData.total_paid) + '%'}}
                                                                            >
                                                        <span
                                                            className="sr-only">{100 * attendance.total_attendance / classData.total_paid}%</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}

                                                        </div>
                                                        }
                                                        {classData.teacher &&
                                                        <div><h4><strong>Điểm danh giảng viên</strong></h4>
                                                            {classData.teacher.attendances.map((attendance, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <div
                                                                                className="flex flex-row-center flex-space-between">
                                                                                <div>
                                                                                    <strong>Buổi {attendance.order} </strong>
                                                                                    {
                                                                                        attendance.staff &&
                                                                                        attendance.staff.name

                                                                                    }
                                                                                </div>
                                                                                {
                                                                                    attendance.is_change &&
                                                                                    <div>
                                                                                        <TooltipButton placement="top"
                                                                                                       text="Đổi giảng viên"
                                                                                        >
                                                                                            <button
                                                                                                className="btn btn-xs btn-round"
                                                                                                onClick={() => this.openModalChangeTeacher(attendance)}
                                                                                            >
                                                                                                <i className="material-icons">compare_arrows</i>
                                                                                                <div
                                                                                                    className="ripple-container"/>
                                                                                            </button>
                                                                                        </TooltipButton>
                                                                                        <TooltipButton placement="top"
                                                                                                       text="Xem thêm"
                                                                                        >
                                                                                            <button
                                                                                                className="btn btn-xs btn-round btn-rose"
                                                                                                onClick={() => this.openModalTeachingLesson(attendance, 1)}
                                                                                            >
                                                                                                <i className="material-icons">more_horiz</i>
                                                                                                <div
                                                                                                    className="ripple-container"/>
                                                                                            </button>
                                                                                        </TooltipButton>
                                                                                    </div>

                                                                                }
                                                                            </div>
                                                                            <AttendanceTeacher
                                                                                attendance={attendance}

                                                                            />
                                                                        </div>
                                                                    )
                                                                        ;
                                                                }
                                                            )}

                                                        </div>
                                                        }
                                                        {classData.teacher_assistant &&
                                                        <div><h4><strong>Điểm danh trợ giảng</strong></h4>
                                                            {classData.teacher_assistant.attendances.map((attendance, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <div
                                                                                className="flex flex-row-center flex-space-between">
                                                                                <div>
                                                                                    <strong>Buổi {attendance.order} </strong>
                                                                                    {
                                                                                        attendance.staff &&
                                                                                        attendance.staff.name

                                                                                    }
                                                                                </div>
                                                                                {
                                                                                    attendance.is_change &&
                                                                                    <div>
                                                                                        <TooltipButton placement="top"
                                                                                                       text="Đổi trợ giảng"
                                                                                        >
                                                                                            <button
                                                                                                className="btn btn-xs btn-round"
                                                                                                onClick={() => this.openModalTeachAssis(attendance)}
                                                                                            >
                                                                                                <i className="material-icons">compare_arrows</i>
                                                                                                <div
                                                                                                    className="ripple-container"/>
                                                                                            </button>
                                                                                        </TooltipButton>
                                                                                        <TooltipButton placement="top"
                                                                                                       text="Xem thêm"
                                                                                        >
                                                                                            <button
                                                                                                className="btn btn-xs btn-round btn-rose"
                                                                                                onClick={() => this.openModalTeachingLesson(attendance, 2)}
                                                                                            >
                                                                                                <i className="material-icons">more_horiz</i>
                                                                                                <div
                                                                                                    className="ripple-container"/>
                                                                                            </button>
                                                                                        </TooltipButton>
                                                                                    </div>

                                                                                }

                                                                            </div>
                                                                            <AttendanceTeacher
                                                                                attendance={attendance}

                                                                            />
                                                                        </div>
                                                                    );
                                                                }
                                                            )}

                                                        </div>
                                                        }

                                                    </div>
                                                }
                                            </div>    
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.showModalClassLesson}
                    onHide={this.props.isChangingClassLesson ? null : this.closeModalClassLesson}
                >
                    <Modal.Header closeButton={!this.props.isChangingClassLesson}>
                        <h4 className="modal-title">Đổi ngày học</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputDate
                                label="Chọn ngày"
                                value={this.state.changeDate.date}
                                updateFormData={(event) => this.setState({
                                    changeDate:
                                        {
                                            ...this.state.changeDate,
                                            date: event.target.value
                                        }
                                })}
                                id="form-change-date"
                                name="change-date"
                            />
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeDate.note}
                                updateFormData={(event) => this.setState({
                                    changeDate:
                                        {
                                            ...this.state.changeDate,
                                            note: event.target.value
                                        }
                                })}
                                name="note-change-date"
                            />
                            {this.props.isChangingClassLesson ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeClassLesson}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingClassLesson ? " disabled" : "")}
                                    onClick={this.props.isChangingClassLesson ? null : this.closeModalClassLesson}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>


                        </form>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalChangeTeacher}
                    onHide={this.closeModalChangeTeacher}
                >
                    <Modal.Header>
                        <h4 className="modal-title">Đổi giảng viên</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="form-group">
                                <Select
                                    name="form-field-name"
                                    value={this.state.changeTeacher.id}
                                    options={this.state.staffs}
                                    optionRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    valueRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    onChange={(value) => this.setState({
                                        changeTeacher: {
                                            ...this.state.changeTeacher,
                                            id: value ? value.id : ""
                                        }
                                    })}
                                    placeholder="Chọn giảng viên"
                                />
                            </div>
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeTeacher.note}
                                updateFormData={(event) => this.setState({
                                    changeTeacher:
                                        {
                                            ...this.state.changeTeacher,
                                            note: event.target.value
                                        }
                                })}
                                name="note-change-teaching-assis"
                            />
                            {this.props.isChangingTeacher ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeTeacher}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingTeacher ? " disabled" : "")}
                                    onClick={this.props.isChangingTeacher ? null : this.closeModalChangeTeacher}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalChangeTeachAssis}
                    onHide={this.props.isChangingTeachingAssis ? null : this.closeModalTeachAssis}
                >
                    <Modal.Header closeButton={!this.props.isChangingTeachingAssis}>
                        <h4 className="modal-title">Đổi trợ giảng</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="form-group">
                                <Select
                                    name="form-field-name"
                                    value={this.state.changeTeachAssis.id}
                                    options={this.state.staffs}
                                    optionRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    valueRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    onChange={(value) => this.setState({
                                        changeTeachAssis: {
                                            ...this.state.changeTeachAssis,
                                            id: value ? value.id : ""
                                        }
                                    })}
                                    placeholder="Chọn trợ giảng"
                                />
                            </div>
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeTeachAssis.note}
                                updateFormData={(event) => this.setState({
                                    changeTeachAssis:
                                        {
                                            ...this.state.changeTeachAssis,
                                            note: event.target.value
                                        }
                                })}
                                name="note-change-teaching-assis"
                            />
                            {this.props.isChangingTeachingAssis ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeTeachingAssis}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingTeachingAssis ? " disabled" : "")}
                                    onClick={this.props.isChangingTeachingAssis ? null : this.closeModalTeachAssis}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </Modal.Body>
                </Modal><Modal
                show={this.state.showModalTeachingLesson}
                onHide={this.closeModalTeachingLesson}
            >
                <Modal.Header closeButton={!this.props.isChangingTeachingAssis}>
                    <h4 className="modal-title">Danh
                        sách {this.state.typeTeachingLesson === 1 ? "giảng viên" : "trợ giảng"} buổi {this.state.attendanceSelected.order}</h4>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoadingTeachingLesson ? <Loading/> :
                            <div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="text-rose">
                                        <tr>
                                            <th/>
                                            <th>Tên</th>
                                            <th>Đổi</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.teachingLessons.map((teacher, index) => {
                                                let avatar = helper.avatarEmpty(teacher.avatar_url) ?
                                                    NO_AVATAR : teacher.avatar_url;
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="avatar-list-staff"
                                                                 style={{
                                                                     background: 'url(' + avatar + ') center center / cover',
                                                                     display: 'inline-block'
                                                                 }}
                                                            />
                                                        </td>
                                                        <td>{teacher.name}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-rose"
                                                                onClick={() => this.openModalChangeTeachingLesson(teacher)}
                                                            >
                                                                Thay đổi
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                </Modal.Body>
            </Modal>
                <Modal
                    show={this.state.showModalChangeTeachingLesson}
                    onHide={this.closeModalChangeTeachingLesson}
                >
                    <Modal.Header>
                        <h4 className="modal-title">Đổi {this.state.typeTeachingLesson === 1 ? "giảng viên" : "trợ giảng"}</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="form-group">
                                <Select
                                    name="form-field-name"
                                    value={this.state.changeTeachingLesson.id}
                                    options={this.state.staffs}
                                    optionRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    valueRenderer={(option) => {
                                        return (
                                            <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                        );
                                    }}
                                    onChange={(value) => this.setState({
                                        changeTeachingLesson: {
                                            ...this.state.changeTeachingLesson,
                                            id: value ? value.id : ""
                                        }
                                    })}
                                    placeholder={this.state.typeTeachingLesson === 1 ? "Chọn giảng viên" : "Chọn trợ giảng"}
                                />
                            </div>
                            <FormInputText
                                label="Ghi chú"
                                value={this.state.changeTeachingLesson.note}
                                updateFormData={(event) => this.setState({
                                    changeTeachingLesson:
                                        {
                                            ...this.state.changeTeachingLesson,
                                            note: event.target.value
                                        }
                                })}
                            />
                            {this.props.isChangingTeachingLesson ?
                                (
                                    <button type="button" className="btn btn-success btn-round disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang đổi
                                    </button>

                                )
                                :
                                (
                                    <button type="button" className="btn btn-success btn-round"
                                            onClick={this.changeTeachingLesson}
                                    ><i
                                        className="material-icons">check</i> Xác nhận đổi
                                    </button>
                                )

                            }

                            <button type="button"
                                    className={"btn btn-danger btn-round" + (this.props.isChangingTeachingLesson ? " disabled" : "")}
                                    onClick={this.props.isChangingTeachingLesson ? null : this.closeModalChangeTeachingLesson}
                            ><i
                                className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ClassContainer.propTypes = {
    class: PropTypes.object.isRequired,
    classActions: PropTypes.object.isRequired,
    isLoadingClass: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isChangingClassLesson: PropTypes.bool.isRequired,
    isChangingTeachingAssis: PropTypes.bool.isRequired,
    isChangingTeacher: PropTypes.bool.isRequired,
    isLoadingStaffs: PropTypes.bool.isRequired,
    isChangingTeachingLesson: PropTypes.bool.isRequired,
    isLoadingTeachingLesson: PropTypes.bool.isRequired,
    staffs: PropTypes.array.isRequired,
    teachingLessons: PropTypes.array.isRequired,
    children: PropTypes.element,
    pathname: PropTypes.string,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        class: state.classes.class,
        isLoading: state.classes.isLoading,
        isLoadingClass: state.classes.isLoadingClass,
        isChangingClassLesson: state.classes.isChangingClassLesson,
        isChangingTeachingAssis: state.classes.isChangingTeachingAssis,
        isChangingTeacher: state.classes.isChangingTeacher,
        isLoadingStaffs: state.classes.isLoadingStaffs,
        isLoadingTeachingLesson: state.classes.isLoadingTeachingLesson,
        teachingLessons: state.classes.teachingLessons,
        staffs: state.classes.staffs,
        isChangingTeachingLesson: state.classes.isChangingTeachingLesson,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);
