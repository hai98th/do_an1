import React from "react";
import {Modal} from "react-bootstrap";
import * as prj1Api from "./prj1Api";


class PersonnelContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            personnel: [],
            modal: false,
            personModal: {}
        };
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
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
            personModal: a
        })
    }

    delPerson(id){
        prj1Api.deletePersonnelApi(id)
            .then(function (res) {
                if (res) {
                    alert("Xóa nhân sự thành công");
                }
            });
        window.location.reload();
    }

    updateFormData(event) {
        const field = event.target.name;
        let psn = {...this.state.personModal};
        psn[field] = event.target.value;
        this.setState({
            ...this.state,
            personModal: psn
        })
    }

    submit(psn) {
        if (psn.id) {
            prj1Api.editPersonnelApi(psn)
                .then((res) => {
                    if (res) {
                        alert("Chỉnh sủa nhân sự thành công");
                    }
                });
        }
        else {
            prj1Api.creatPersonnelApi(psn)
                .then((res) => {
                    if (res) {
                        alert("Tạo nhân sự mới thành công");
                    }
                });
        }
       window.location.reload()

    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Quản lí nhân sự</strong>
                            </h4>

                            <div>
                                <div
                                >
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {
                                            this.changeModal2({sounds: JSON.stringify(["a", "b"])});
                                        }}>

                                        <strong>+</strong>
                                    </button>
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
                                    <th>Ava</th>
                                    <th>Họ tên</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Chức vụ</th>
                                    <th>Bộ phận</th>
                                    <th>File giọng nói</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>

                                {

                                    this.state.personnel && this.state.personnel.map((ps, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img style={{height: 40, width: 40, borderRadius: 20}}
                                                         src={ps.ava_url}/>
                                                </td>
                                                <td>
                                                    {ps.name}
                                                </td>
                                                <td>
                                                    {ps.phone}
                                                </td>
                                                <td>
                                                    {ps.email}
                                                </td>
                                                <td>
                                                    {ps.position}
                                                </td>
                                                <td>
                                                    {ps.part}
                                                </td>
                                                <td>
                                                    {
                                                        JSON.parse(ps.sounds) && JSON.parse(ps.sounds).map((s, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <audio ref="audio_tag" src={s} controls/>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </td>
                                                <td>


                                                    <div className="btn-group-action">
                                                        <div
                                                            style={{display: "inline-block"}}>
                                                            <a style={{color: "#878787"}}
                                                               onClick={() => {
                                                                   this.changeModal2(ps);
                                                               }}>
                                                                <i className="material-icons">edit</i>
                                                            </a>
                                                        </div>
                                                        <div
                                                            style={{display: "inline-block"}}>
                                                            <a style={{color: "#878787"}}
                                                               onClick={() => {
                                                                   this.delPerson(ps.id);
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
                            <Modal.Title>Quản lý nhân sự</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">

                                <form role="form">
                                    <div>
                                        <label className="control-label">Họ tên</label>
                                        <input name="name" value={this.state.personModal.name || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Phone</label>
                                        <input name="phone" value={this.state.personModal.phone || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Email</label>
                                        <input name="email" value={this.state.personModal.email || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Avatar Url</label>
                                        <input name="ava_url" value={this.state.personModal.ava_url || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Chức vụ</label>
                                        <input name="position" value={this.state.personModal.position || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Bộ phận</label>
                                        <input name="part" value={this.state.personModal.part || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">File giọng nói (gửi lên như mẫu)</label>
                                        <input name="sounds" value={this.state.personModal.sounds || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>

                                    <br/>

                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {
                                                    this.submit(this.state.personModal);
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

export default PersonnelContainer