import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import {bindActionCreators} from "redux";
import Loading from "../../../components/common/Loading";
import * as prj1Action from "../prj1Action";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import {DATETIME_FORMAT_SQL} from "../../../constants/constants";
import Select from "react-select";


class MeetingModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
        this.changTemplateTypes2 = this.changTemplateTypes2.bind(this);
        this.changTemplateTypes = this.changTemplateTypes.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAddEditMeeting !== nextProps.isAddEditMeeting) {
            this.props.prj1Action.getMeeting();
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        let mt = {...this.props.handleMeetingModal};
        mt[field] = event.target.value;
        this.props.prj1Action.handleMeetingModal(mt);
    }

    changTemplateTypes2(value) {
        let mt = {
            ...this.props.handleMeetingModal,
            room_name: value ? value.value : '',
        };
        this.props.prj1Action.handleMeetingModal(mt);
    }

    changTemplateTypes(value){
        let member = this.props.handleMeetingModal.members ? this.props.handleMeetingModal.members : '[]';
        let mb = JSON.parse(member);
        mb.push(value.value);
        let mt = {
            ...this.props.handleMeetingModal,
            members: JSON.stringify(mb),
        };
        this.props.prj1Action.handleMeetingModal(mt);
    }

    submit(mt) {
        if (mt.id) {
            this.props.prj1Action.editMeeting(mt);
        }
        else
            this.props.prj1Action.creatMeeting(JSON.stringify(mt));


    }

    render() {
        return (
            <Modal
                show={this.props.meetingModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {
                            this.props.prj1Action.openMeetingModal();
                        });

                }}>
                <a onClick={() => {
                    this.props.prj1Action.openMeetingModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý cuộc họp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <FormInputText
                                    label="Tên cuộc họp"
                                    name="name"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleMeetingModal.name || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Nội dung cuộc họp"
                                    name="content"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleMeetingModal.content || ''}
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6"><br/>
                                    <label className="label-control">Phòng</label>
                                    <Select
                                        // disabled={false}
                                        value={this.props.handleMeetingModal.room_name || ''}
                                        options={this.props.room.map((room) => {
                                            return {
                                                value: room.name,
                                                label: room.name,
                                            };
                                        })}
                                        onChange={this.changTemplateTypes2}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormInputDateTime
                                        format={DATETIME_FORMAT_SQL}
                                        id={"booking-date-time"}
                                        name="date_time"
                                        updateFormData={this.updateFormData}
                                        value={this.props.handleMeetingModal.date_time || ''}
                                        label={"Thời gian bắt đầu"}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <br/>
                                    <label className="label-control">Chọn thành viên</label>
                                    <Select
                                        // disabled={false}
                                        value={''}
                                        options={this.props.personnel.map((room) => {
                                            return {
                                                value: room.name,
                                                label: room.name,
                                            };
                                        })}
                                        onChange={this.changTemplateTypes}
                                    />
                                </div>

                            </div>
                            <div>

                                <FormInputText

                                    name="members"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleMeetingModal.members || ''}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <FormInputText
                                        label="Chỉ đạo cuộc họp"
                                        name="leader"
                                        updateFormData={this.updateFormData}
                                        value={this.props.handleMeetingModal.leader || ''}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormInputText
                                        label="Thư ký"
                                        name="secretary"
                                        updateFormData={this.updateFormData}
                                        value={this.props.handleMeetingModal.secretary || ''}
                                        required
                                    />
                                </div>
                            </div>


                            <br/>
                            {
                                this.props.isAddEditMeeting ? <Loading/> :
                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {
                                                    this.submit(this.props.handleMeetingModal);
                                                }}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                    this.props.prj1Action.openMeetingModal();
                                                }}
                                            >
                                                Huỷ
                                            </button>
                                        </div>


                                    </div>
                            }


                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

MeetingModal.propTypes = {
    meetingModal: PropTypes.bool.isRequired,
    isAddEditMeeting: PropTypes.bool.isRequired,
    prj1Action: PropTypes.object.isRequired,
    handleMeetingModal: PropTypes.object.isRequired,
    room: PropTypes.array.isRequired,
    personnel: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        meetingModal: state.prj1.meetingModal,
        isAddEditMeeting: state.prj1.isAddEditMeeting,
        handleMeetingModal: state.prj1.handleMeetingModal,
        room: state.prj1.room,
        personnel: state.prj1.personnel,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingModal);
