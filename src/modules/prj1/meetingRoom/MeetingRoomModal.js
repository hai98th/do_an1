import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import {bindActionCreators} from "redux";
import Loading from "../../../components/common/Loading";
import * as prj1Action from "../prj1Action";



class MeetingRoomModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAddEditRoom !== nextProps.isAddEditRoom) {
            this.props.prj1Action.getRoom();
        }
    }
    updateFormData(event) {
        const field = event.target.name;
        let room = {...this.props.handleRoomModal};
        room[field] = event.target.value;
        this.props.prj1Action.handleRoomModal(room);
    }


    submit(room) {
        if (room.id){
            this.props.prj1Action.editRoom(room);
        }
        else
            this.props.prj1Action.creatRoom(JSON.stringify(room));


    }

    render() {
        return (
            <Modal
                show={this.props.roomModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {
                            this.props.prj1Action.openRoomModal();
                        });

                }}>
                <a onClick={() => {
                    this.props.prj1Action.openRoomModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý phòng họp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <FormInputText
                                    label="Tên phòng"
                                    name="name"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleRoomModal.name || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Link ảnh đại diện"
                                    name="ava_url"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleRoomModal.ava_url || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Miêu tả"
                                    name="description"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleRoomModal.description || ''}
                                    required
                                />
                            </div>




                            <br/>
                            {
                                this.props.isAddEditRoom ? <Loading/> :
                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() =>{this.submit(this.props.handleRoomModal);}}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {this.props.prj1Action.openRoomModal();}}
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

MeetingRoomModal.propTypes = {
    roomModal: PropTypes.bool.isRequired,
    isAddEditRoom: PropTypes.bool.isRequired,
    prj1Action: PropTypes.object.isRequired,
    handleRoomModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        roomModal: state.prj1.roomModal,
        isAddEditRoom: state.prj1.isAddEditRoom,
        handleRoomModal: state.prj1.handleRoomModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingRoomModal);
