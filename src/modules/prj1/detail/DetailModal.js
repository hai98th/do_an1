import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import {bindActionCreators} from "redux";
import Loading from "../../../components/common/Loading";
import * as prj1Action from "../prj1Action";


class DetailModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAddEditDetail !== nextProps.isAddEditDetail) {
            this.props.prj1Action.getDetail(this.props.handleMeetingModal.id);
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        let room = {...this.props.handleDetailModal};
        room[field] = event.target.value;
        this.props.prj1Action.handleDetailModal(room);
    }


    submit(detail) {
        if (detail.id) {
            this.props.prj1Action.editDetail(this.props.handleMeetingModal.id, detail);
        }
        else
            this.props.prj1Action.creatDetail(this.props.handleMeetingModal.id, JSON.stringify(detail));
    }

    render() {
        return (
            <Modal
                show={this.props.detailModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {
                            this.props.prj1Action.openDetailModal();
                        });

                }}>
                <a onClick={() => {
                    this.props.prj1Action.openDetailModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết cuộc họp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <FormInputText
                                    label="Thời gian"
                                    name="time"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleDetailModal.time || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Tên"
                                    name="name"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleDetailModal.name || ""}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Nội dung"
                                    name="content"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handleDetailModal.content || ""}
                                    required
                                />
                            </div>
                            <br/>
                            {
                                this.props.isAddEditDetail ? <Loading/> :
                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() => {
                                                    this.submit(this.props.handleDetailModal);
                                                }}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                    this.props.prj1Action.openDetailModal();
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

DetailModal.propTypes = {
    detailModal: PropTypes.bool.isRequired,
    isAddEditDetail: PropTypes.bool.isRequired,
    prj1Action: PropTypes.object.isRequired,
    handleDetailModal: PropTypes.object.isRequired,
    handleMeetingModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        detailModal: state.prj1.detailModal,
        isAddEditDetail: state.prj1.isAddEditDetail,
        handleDetailModal: state.prj1.handleDetailModal,
        handleMeetingModal: state.prj1.handleMeetingModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
