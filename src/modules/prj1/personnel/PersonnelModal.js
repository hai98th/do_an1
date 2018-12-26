import React from "react";
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import {bindActionCreators} from "redux";
import Loading from "../../../components/common/Loading";
import * as prj1Action from "../prj1Action";



class PersonnelModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAddEditPersonnel !== nextProps.isAddEditPersonnel) {
            this.props.prj1Action.getPersonnel();
        }
    }
    updateFormData(event) {
        const field = event.target.name;
        let psn = {...this.props.handlePersonnelModal};
        psn[field] = event.target.value;
        this.props.prj1Action.handlePersonnelModal(psn);
    }


    submit(psn) {
        if (psn.id){
            this.props.prj1Action.editPersonnel(psn);
        }
        else
        this.props.prj1Action.creatPersonnel(JSON.stringify(psn));


    }

    render() {
        return (
            <Modal
                show={this.props.personnelModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {
                            this.props.prj1Action.openPersonnelModal();
                        });

                }}>
                <a onClick={() => {
                    this.props.prj1Action.openPersonnelModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý nhân sự</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <FormInputText
                                    label="Họ Tên"
                                    name="name"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handlePersonnelModal.name || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Phone"
                                    name="phone"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handlePersonnelModal.phone || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Email"
                                    name="email"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handlePersonnelModal.email || ''}
                                    required
                                />
                            </div>
                            <div>
                                <FormInputText
                                    label="Link ảnh đại diện"
                                    name="ava_url"
                                    updateFormData={this.updateFormData}
                                    value={this.props.handlePersonnelModal.ava_url || ''}
                                    required
                                />
                            </div>
                            <div>
                            <FormInputText
                                label="Chức vụ"
                                name="position"
                                updateFormData={this.updateFormData}
                                value={this.props.handlePersonnelModal.position || ''}
                                required
                            />
                            </div>
                            <div>
                            <FormInputText
                                label="Bộ phận"
                                name="part"
                                updateFormData={this.updateFormData}
                                value={this.props.handlePersonnelModal.part || ''}
                                required
                            />
                        </div><div>
                            <FormInputText
                                label="File giọng nói <--Gửi lên dạng string array--!>"
                                name="sounds"
                                updateFormData={this.updateFormData}
                                value={this.props.handlePersonnelModal.sounds || ''}
                                required
                            />
                        </div>



                            <br/>
                            {
                                this.props.isAddEditPersonnel ? <Loading/> :
                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={() =>{this.submit(this.props.handlePersonnelModal);}}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {this.props.prj1Action.openPersonnelModal();}}
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

PersonnelModal.propTypes = {
    personnelModal: PropTypes.bool.isRequired,
    isAddEditPersonnel: PropTypes.bool.isRequired,
    prj1Action: PropTypes.object.isRequired,
    handlePersonnelModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        personnelModal: state.prj1.personnelModal,
        isAddEditPersonnel: state.prj1.isAddEditPersonnel,
        handlePersonnelModal: state.prj1.handlePersonnelModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelModal);
