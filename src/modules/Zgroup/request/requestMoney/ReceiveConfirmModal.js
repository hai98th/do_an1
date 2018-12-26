import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import FormInputText from "../../../../components/common/FormInputText";
import * as helper from '../../../../helpers/helper';
import BigCloseButtonForModal from "../../../../components/common/BigCloseButtonForModal";
import ReactSelect from 'react-select';

class ReceiveConfirmModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            money_used: 0,
            company_receive_id: "",
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.close = this.close.bind(this);
    }


    componentDidMount() {
        helper.setFormValidation('#form-conmfirm');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.show && !nextProps.show) {
            this.setState({ money_used: 0 });
        }
    }

    updateFormData(e) {
        if (!e) return;
        let { name, value } = e.target;
        if (!value || !name) return;
        this.setState({ [name]: value });
    }

    close() {
        if ($("#form-confirm").valid()) {
            if (helper.isEmptyInput(this.state.company_receive_id)) {
                helper.showWarningNotification("Vui lòng chọn nguồn hoàn ứng!");
            } else
                helper.confirm(
                    "warning", "Cảnh báo", "Bạn có chắc chắn muốn duyệt?",
                    () => {
                        this.props.submit(this.state.money_used, this.state.company_receive_id);
                    },
                );
        }

    }

    render() {
        let { data, companies } = this.props;
        let money = 0;
        if (data.money_received) money = data.money_received - this.state.money_used;
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title>
                        Duyệt hoàn trả
                        <BigCloseButtonForModal onClick={this.props.onHide} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-confirm" onSubmit={(e) => e.preventDefault()}>
                        <div className="row">
                            <div className="col-md-12">
                                <label>Số tiền yêu cầu</label>
                                <div>{data.money_payment || 0}</div>
                            </div>

                            <div className="col-md-12">
                                <label>Số tiền thực nhận</label>
                                <div>{data.money_received || 0}</div>
                            </div>
                            <div className="col-md-12">
                                <label>Chọn nguồn hoàn ứng</label>
                                <ReactSelect
                                    options={companies || []}
                                    onChange={(e) => { return this.updateFormData({ target: { name: "company_receive_id", value: e.id } }); }}
                                    value={this.state.company_receive_id}
                                    defaultMessage="Chọn"
                                />
                            </div><br />
                            <div className="col-md-12" style={{ marginTop: 15 }}>Số tiền đã sử dụng: {helper.dotNumber(this.state.money_used)}</div>
                            <div className="col-md-12">

                                <FormInputText
                                    label="Số tiền đã sử dụng"
                                    required
                                    name="money_used"
                                    updateFormData={this.updateFormData}
                                    value={this.state.money_used}
                                    type="number"
                                    minValue="0"
                                />
                            </div>

                            <div className="col-md-12">
                                <label>Số tiền hoàn trả</label>
                                <div>{money || 0}</div>
                            </div>

                        </div></form>
                </Modal.Body>
                <Modal.Footer>
                    <button style={{ width: 130 }} className="btn btn-rose" onClick={this.close}>Xác nhận</button>
                    <button style={{ width: 130 }} className="btn" onClick={this.props.onHide}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ReceiveConfirmModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    submit: PropTypes.func,
    data: PropTypes.object,
    companies: PropTypes.array,
};


export default ReceiveConfirmModal;