import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as goodOrderActions from './goodOrderActions';
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";

class AddNoteModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleNote = this.handleNote.bind(this);
    }

    handleNote(e) {
        const field = e.target.name;
        let orderNote = {...this.props.orderNote};
        orderNote[field] = e.target.value;
        this.props.goodOrderActions.handleAddNoteModal(orderNote);
    }

    render() {
        return (
            <Modal show={this.props.addNoteModal}
                   onHide={() => this.props.goodOrderActions.showAddNoteModal()}>
                <a onClick={() => this.props.goodOrderActions.showAddNoteModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Ghi chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Ghi chú</label>
                        <input type="text" className="form-control"
                               value={this.props.orderNote.note ? this.props.orderNote.note : ''}
                               name="note"
                               onChange={this.handleNote}/>
                        <span className="material-input"/>

                    </div>
                    {
                        this.props.isSendingNote ? <Loading/> : (
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={() => this.props.goodOrderActions.editNote(this.props.orderNote)}><i
                                    className="material-icons">check</i> Xác nhận
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.goodOrderActions.showAddNoteModal()}>
                                    <i className="material-icons">close</i> Huỷ
                                </button>
                            </div>
                        )
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

AddNoteModal.propTypes = {
    goodOrderActions: PropTypes.object.isRequired,
    addNoteModal: PropTypes.bool,
    orderNote: PropTypes.object.isRequired,
    isSendingNote: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        addNoteModal: state.goodOrders.addNoteModal,
        orderNote: state.goodOrders.orderNote,
        isSendingNote: state.goodOrders.isSendingNote
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);
