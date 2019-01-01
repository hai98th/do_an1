import React from "react";
import * as prj1Api from "./prj1Api";
import {post} from 'axios';
import {Modal} from "react-bootstrap";
import Select from "react-select";


class MeetingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            personnel: [],
            room: [],
            meeting: [],
            file: null,
            modal: false,
            meetingModal: {},
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.changTemplateTypes2 = this.changTemplateTypes2.bind(this);
        this.changTemplateTypes = this.changTemplateTypes.bind(this);
    }

    componentWillMount() {
        this.getMeeting();
        this.getRoom();
        this.getPersonnel();
    }

    getPersonnel() {
        prj1Api.getPersonnelApi()
            .then((res) => {
                this.setState({
                    ...this.state,
                    personnel: res.data.personnel
                })
            });
    }

    getRoom() {
        prj1Api.getRoomApi()
            .then((res) => {
                this.setState({room: res.data.room})
            });
    }

    changTemplateTypes(value) {
        let member = this.state.meetingModal.members ? this.state.meetingModal.members : '[]';
        let mb = JSON.parse(member);
        mb.push(value.value);
        let mt = {
            ...this.state.meetingModal,
            members: JSON.stringify(mb),
        };
        this.setState({
            ...this.state,
            meetingModal: mt
        });
    }

    changTemplateTypes2(value) {
        // console.log(value)
        let mt = {
            ...this.state.meetingModal,
            room_name: value.value
        };
        this.setState({
            ...this.state,
            meetingModal: mt
        })
    }

    updateFormData(event) {
        const field = event.target.name;
        let psn = {...this.state.meetingModal};
        psn[field] = event.target.value;
        this.setState({
            ...this.state,
            meetingModal: psn
        })
    }

    changeModal() {
        this.setState({
            ...this.state,
            modal: !this.state.modal
        })
    }

    changeModal2(a) {
        this.setState({
            ...this.state,
            modal: !this.state.modal,
            meetingModal: a
        })
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.fileUpload(this.state.file).then((response) => {
            if (response) alert("Tải file thành công!");
        })
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    fileUpload(file) {
        const url = 'http://localhost:5000/api/uploader';
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return post(url, formData, config)
    }


    getMeeting() {

        prj1Api.getMeetingApi()
            .then((res) => {
                this.setState({meeting: res.data.meeting})
            });

    }

    submit(psn) {
        if (psn.id) {
            prj1Api.editMeetingApi(psn)
                .then((res) => {
                    if (res) {
                        alert("Chỉnh sủa thành công");
                    }
                });
        }
        else {
            prj1Api.createMeetingApi(psn)
                .then((res) => {
                    if (res) {
                        alert("Tạo mới thành công");
                    }
                });
        }
        window.location.reload()

    }

    delete(id) {
        prj1Api.deleteMeetingApi(id)
            .then(function (res) {
                if (res) {
                    alert("Xóa thành công");
                }
            });
        window.location.reload();
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Quản lý cuộc họp</strong>
                                    </h4>

                                    <div>
                                        <div>
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                type="button"
                                                onClick={() => {
                                                    this.changeModal2({date_time: "YYYY-MM-DD HH:MM:SS"});
                                                }}>

                                                <strong>+</strong>

                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Tải file ghi âm &emsp;</strong>
                                    </h4>

                                    <div>
                                        <form onSubmit={this.onFormSubmit} className="flex-row flex">
                                            <input  type="file" onChange={this.onChange}/>
                                            <button className="upload_button"
                                                type="submit" >Upload</button>
                                        </form>
                                    </div>


                                </div>
                            </div>
                        </div>


                        <br/>

                    </div>
                    <div>

                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead className="text-rose">
                                <tr className="text-rose">
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Nội dung</th>
                                    <th>Số thành<br/> viên</th>
                                    <th>Phòng</th>
                                    <th>Thời gian họp</th>
                                    <th>Điều hành <br/> cuộc họp</th>
                                    <th>Thư ký</th>
                                    <th>Chi tiết</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.meeting && this.state.meeting.map((mt, index) => {
                                        let name = mt.name;
                                        let description = mt.content;
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className="film-name">
                                                    <div>
                                                        <div>{name.length < 12 ? name : name.slice(0, 12).concat('...')}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div>{description.length < 25 ? description : description.slice(0, 25).concat('...')}</div>
                                                    </div>
                                                </td>

                                                <td>
                                                    &ensp;&emsp;{JSON.parse(mt.members).length + 2}
                                                </td>
                                                <td>
                                                    {mt.room_name}
                                                </td>
                                                <td>
                                                    {mt.date_time}
                                                </td>
                                                <td className="film-name">
                                                    {mt.leader}
                                                </td>
                                                <td className="film-name">
                                                    {mt.secretary}
                                                </td>
                                                <td>


                                                    <div className="btn-group-action">

                                                        <a
                                                            href={"/detail/:" + mt.id}
                                                            style={{display: "inline-block"}}>
                                                            <div>
                                                                <i className="material-icons">add_circle</i>
                                                            </div>
                                                        </a>


                                                        <div
                                                            style={{display: "inline-block"}}>
                                                            <a style={{color: "#878787"}}
                                                               onClick={() => {
                                                                   this.changeModal2(mt);
                                                               }}>
                                                                <i className="material-icons">edit</i>
                                                            </a>
                                                        </div>

                                                        <div
                                                            style={{display: "inline-block"}}>
                                                            <a style={{color: "#878787"}}
                                                               onClick={() => {
                                                                   this.delete(mt.id);
                                                               }}>
                                                                <i className="material-icons">delete</i>
                                                            </a>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>
                                        );
                                    })
                                }


                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Modal
                        show={this.state.modal}
                    >

                        <Modal.Header closeButton onClick={() => {
                            this.changeModal();
                        }}>
                            <Modal.Title>Quản lý cuộc họp</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <form role="form">
                                    <div>
                                        <label className="control-label">Tên cuộc họp</label>
                                        <input name="name" value={this.state.meetingModal.name || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Nội dung cuộc họp</label>
                                        <input name="content" value={this.state.meetingModal.content || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div className="row"><br/>
                                        <div className="col-md-3">
                                            <label className="label-control">Phòng</label>
                                            <Select
                                                options={this.state.room.map((room) => {
                                                    return {
                                                        value: room.name,
                                                        label: room.name,
                                                    };
                                                })}
                                                onChange={this.changTemplateTypes2}
                                            />
                                        </div>

                                        <div className="col-md-2">
                                            <label className="control-label"/>
                                            <input className="form-control" name="room_name"
                                                   value={this.state.meetingModal.room_name || ''} onChange={() => {
                                            }}/>

                                        </div>
                                        <div className="col-md-1"/>
                                        <div className="col-md-6">
                                            <label className="control-label">Thời gian bắt đầu</label>
                                            <input name="date_time" value={this.state.meetingModal.date_time || ""}
                                                   onChange={e => this.updateFormData(e)} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <br/>
                                            <label className="label-control">Chọn thành viên</label>
                                            <Select
                                                // disabled={false}
                                                value={''}
                                                options={this.state.personnel.map((room) => {
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
                                        <input name="members" value={this.state.meetingModal.members || ""}
                                               onChange={() => {
                                               }} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Chỉ đạo cuộc họp</label>
                                        <input name="leader" value={this.state.meetingModal.leader || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Thư ký</label>
                                        <input name="secretary" value={this.state.meetingModal.secretary || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <br/>
                                    <div style={{textAlign: "right"}}>
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {
                                                    this.submit(this.state.meetingModal);
                                                }}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                    this.changeModal();
                                                }}
                                            >
                                                Huỷ
                                            </button>
                                        </div>


                                    </div>

                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default MeetingContainer