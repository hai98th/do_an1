import React from "react";
import * as prj1Api from "./prj1Api";
import {Modal} from "react-bootstrap";


class RoomContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            room: [],
            roomModal: {},
            modal: false,
            modal2: false,
            setRoom: {},
        };
        this.updateFormData = this.updateFormData.bind(this);
    }


    componentWillMount() {
        this.getRoom();
    }

    updateFormData(event) {
        const field = event.target.name;
        let psn = {...this.state.roomModal};
        psn[field] = event.target.value;
        this.setState({
            ...this.state,
            roomModal: psn
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
            roomModal: a
        })
    }


    getRoom() {
        prj1Api.getRoomApi()
            .then((res) => {
                this.setState({room: res.data.room})
            });
    }

    submit(psn) {
        if (psn.id) {
            prj1Api.editRoomApi(psn)
                .then((res) => {
                    if (res) {
                        alert("Chỉnh sủa phòng thành công");
                    }
                });
        }
        else {
            prj1Api.createRoomApi(psn)
                .then((res) => {
                    if (res) {
                        alert("Tạo phòng mới thành công");
                    }
                });
        }
        window.location.reload()

    }


    delete(id) {
        prj1Api.deleteRoomApi(id)
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
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Quản lý phòng họp</strong>
                            </h4>

                            <div>
                                <div>
                                    <button
                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                        type="button"
                                        onClick={() => {
                                            this.changeModal2({});
                                        }}>

                                        <strong>+</strong>
                                    </button>
                                </div>
                            </div>

                        </div>


                        <br/>

                    </div>
                    <div>

                        <div className="row" id="list-base">
                            {
                                this.state.room && this.state.room.map((rm, index) => {
                                    return (
                                        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                                            <div className="card card-chart">
                                                <div className="card-header" data-background-color="white" style={{
                                                    borderRadius: '10px'
                                                }}>
                                                    <div id="simpleBarChart" className="ct-chart"
                                                         style={{
                                                             width: '100%',
                                                             background: 'url(' + rm.ava_url + ')',
                                                             backgroundSize: 'cover',
                                                             backgroundPosition: 'center',
                                                             height: '200px',
                                                             borderRadius: '10px',
                                                             position: "relative"
                                                         }}
                                                    />
                                                </div>
                                                <div className="card-content" style={{minHeight: '140px'}}>
                                                    <div className="card-action"
                                                         style={{
                                                             height: 55,
                                                             justifyContent: "space-between",
                                                             display: "flex"
                                                         }}>
                                                        <div>

                                                            <h4 className="card-title" style={{fontWeight: 300}}>
                                                                {rm.name}
                                                            </h4>

                                                        </div>
                                                        <div className="btn-group-action">
                                                            <div style={{display: 'inline-block'}}>
                                                                <a data-toggle="tooltip" title="" type="button"
                                                                   rel="tooltip" data-original-title="Sửa"
                                                                   onClick={() => {
                                                                       this.changeModal2(rm)
                                                                   }}>
                                                                    <i className="material-icons">edit</i></a>
                                                                <a data-toggle="tooltip" title="" type="button"
                                                                   rel="tooltip" data-original-title="Xóa"
                                                                   onClick={() => {
                                                                       this.setState({
                                                                           ...this.state,
                                                                           modal2: true,
                                                                           setRoom: rm
                                                                       })

                                                                   }}>
                                                                    <i className="material-icons">delete</i></a></div>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        height: 60
                                                    }}>
                                                        <p className="category">
                                                            {rm.description}
                                                        </p>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    );
                                })
                            }


                        </div>


                        <br/>

                    </div>

                    <Modal
                        show={this.state.modal}
                    >

                        <Modal.Header closeButton onClick={() => {
                            this.changeModal();
                        }}>
                            <Modal.Title>Quản lý phòng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <form role="form">
                                    <div>
                                        <label className="control-label">Tên Phòng</label>
                                        <input name="name" value={this.state.roomModal.name || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Avatar Url</label>
                                        <input name="ava_url" value={this.state.roomModal.ava_url || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <div>
                                        <label className="control-label">Miêu tả</label>
                                        <input name="description" value={this.state.roomModal.description || ""}
                                               onChange={e => this.updateFormData(e)} className="form-control"/>
                                    </div>
                                    <br/>
                                    <div style={{textAlign: "right"}}>
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {
                                                    this.submit(this.state.roomModal);
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
                    <Modal show={this.state.modal2} style={{textAlign: "center"}}>

                        <Modal.Header>
                            <Modal.Title>Thư ký cuộc họp</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <form role="form">
                                    <h2 style={{color: "tomato"}}>Bạn muốn xóa</h2>
                                    <h3><b>Phòng {this.state.setRoom.name}</b></h3>
                                    <br/>
                                    <div>
                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {
                                                    this.delete(this.state.setRoom.id);
                                                    this.setState({...this.state, modal2: false})
                                                }}
                                            >
                                                Xác nhận
                                            </button>
                                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                    this.setState({...this.state, modal2: false})
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

export default RoomContainer