import React from "react";
import * as prj1Api from "./prj1Api";
import {Modal} from "react-bootstrap";
import {post} from "axios/index";


class DetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            meeting: [],
            detail: [],
            modal: false,
            detailModal: {},
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    componentWillMount() {
        this.getDetail(window.location.pathname.slice(9, 12));
        this.getMeeting();
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
            detailModal: a
        })
    }
    updateFormData(event) {
        const field = event.target.name;
        let psn = {...this.state.detailModal};
        psn[field] = event.target.value;
        this.setState({
            ...this.state,
            detailModal: psn
        })
    }
    getMeeting() {

        prj1Api.getMeetingApi()
            .then((res) => {
                this.setState({meeting: res.data.meeting})
            });

    }

    getDetail(id) {

        prj1Api.getDetailApi(id)
            .then((res) => {
                this.setState({
                    ...this.state,
                    detail: res.data.detail
                })
            });

    }

    delete(id) {
        prj1Api.deleteDetailApi(window.location.pathname.slice(9, 12), id)
            .then(function (res) {
                if (res) {
                    alert("Xóa thành công");
                }
            });
        window.location.reload();
    }


    submit(psn) {
        if (psn.id) {
            prj1Api.editDetailApi(window.location.pathname.slice(9, 12),psn)
                .then((res) => {
                    if (res) {
                        alert("Chỉnh sủa thành công");
                    }
                });
        }
        else {
            prj1Api.createDetailApi(window.location.pathname.slice(9, 12),psn)
                .then((res) => {
                    if (res) {
                        alert("Tạo mới thành công");
                    }
                });
        }
        window.location.reload()

    }

    onFormSubmit(e) {
        e.preventDefault();
        this.fileUpload(this.state.file).then((response) => {
            if (response) alert("Tải file thành công!");
            this.setState({
                ...this.state,
                modal: true,
                detailModal: {
                    time: "Change",
                    name: "Unknow",
                    content: response.data.transcription[0][0]
                }
            })
        })
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    fileUpload(file) {
        const url = 'http://192.168.4.57:5000/api/upload';
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return post(url, formData, config)
    }


    render() {
        let mt = {};
        if (this.state.meeting[0]) {
            this.state.meeting.map((m) => {
                if (m.id == window.location.pathname.slice(9, 12)) mt = m
            })
        }

        let dt = this.state.detail;
        return (

            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>{mt.name}</strong>
                            </h4>
                            <br/>
                            <div>
                                <h5><span style={{color: "tomato"}}>Nội dung: </span>
                                    {mt.content}</h5>
                                <div className="row">
                                    <div className="col-md-4 col-xs-4">
                                        <h5>Điều hành: <b>{mt.leader}</b></h5>
                                        <h5>Thư ký: <b>{mt.secretary}</b></h5>
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        {
                                            this.state.meeting[0] ?
                                                JSON.parse(mt.members) && JSON.parse(mt.members).map((mem, index) => {
                                                    return (
                                                        <p key={index}>Member: <b>{mem}</b></p>
                                                    );
                                                })
                                                : ""
                                        }
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        <h5>Start Date: {mt.date_time}</h5>
                                        <h5>Room: {mt.room_name}</h5>
                                    </div>
                                </div>
                                <hr/>
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <span style={{color: "tomato"}}>Chi tiết cuộc họp:</span>
                                    </h4>

                                    <div>
                                        <div
                                        >
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                type="button"
                                                onClick={() => {
                                                    this.changeModal2({time:"HH:MM:SS"});
                                                }}>

                                                <strong>+</strong>
                                            </button>
                                        </div>
                                    </div>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
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

                                {
                                    dt && dt.map((aa, index) => {
                                        return (
                                            <p key={index}>
                                                <b> {aa.time} &emsp; {aa.name}:</b>
                                                &emsp;{aa.content}
                                                &emsp;<span style={{color: "#878787"}}>
                                                <a>
                                                <i className="material-icons" style={{fontSize: 18}}
                                                   onClick={() => {
                                                    this.changeModal2(aa)
                                                   }}
                                                >edit</i></a>
                                                <a><i style={{fontSize: 18}} className="material-icons"
                                                   onClick={() => {
                                                       this.delete(aa.id);
                                                   }}
                                                >delete</i></a>
                                            </span>
                                            </p>
                                        );
                                    })
                                }
                                <br/>
                                <hr/>
                                <p style={{textAlign: "center"}}>Kết thúc cuộc họp </p>
                            </div>

                        </div>
                    </div>
                    <Modal
                        show={this.state.modal}
                    >

                        <Modal.Header closeButton onClick={() => {
                            this.changeModal();
                        }}>
                            <Modal.Title>Chi tiết</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <form role="form">
                                    <div>
                                        <label className="control-label">Thời gian</label>
                                        <input name="time" value={this.state.detailModal.time || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Người nói</label>
                                        <input name="name" value={this.state.detailModal.name || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Nội dung</label>
                                        <input name="content" value={this.state.detailModal.content || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <br/>
                                    <div style={{textAlign: "right"}}>
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {
                                                    this.submit(this.state.detailModal);
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

export default DetailContainer