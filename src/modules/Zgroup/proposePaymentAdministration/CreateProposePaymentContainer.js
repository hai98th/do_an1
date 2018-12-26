import React from "react";
import ReactSelect from 'react-select';
import * as PaymentActions from "../proposePaymentAdministration/ProposePaymentActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../../components/common/Loading";
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import PropTypes from 'prop-types';
import {browserHistory} from "react-router";
import FormInputMoney from "../../../components/common/FormInputMoney";
import Avatar from "../../../components/common/Avatar";
import FormInputDate from "../../../components/common/FormInputDate";
import {DATE_FORMAT, DATETIME_FORMAT_SQL} from "../../../constants/constants";
import moment from "moment/moment";

//import Lightbox from 'react-images';

class CreateProposePaymentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeCompanies = this.changeCompanies.bind(this);
        this.updateFormDataPayer = this.updateFormDataPayer.bind(this);
        this.updateFormDataReceiver = this.updateFormDataReceiver.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-payment');
        this.props.PaymentActions.loadCompanies();
        if (this.props.params.paymentId)
            this.props.PaymentActions.loadPayment(this.props.params.paymentId);
        else this.props.PaymentActions.resetDataPayment();

    }

    changeCompanies() {
        let data = [];
        data = this.props.companies.map((company) => {
            return {
                value: company.id,
                label: company.name,
                account_number: company.account_number,
            };
        });
        return data;

    }

    handleUpload(event) {
        const file = event.target.files[0];
        this.props.PaymentActions.uploadImage(file, this.props.data);
    }

    updateFormDataPayer(e) {
        if (!e) return;
        let value = e.value;
        let p = e.account_number;
        let newdata = {
            ...this.props.data, payer: {
                "id": value,
                "account_number": p
            }
        };
        this.props.PaymentActions.updateFormData(newdata);
    }

    updateFormDataReceiver(e) {
        if (!e) return;
        let value = e.value;
        let p = e.account_number;
        let newdata = {
            ...this.props.data, receiver: {
                "id": value,
                "account_number": p
            }
        };
        this.props.PaymentActions.updateFormData(newdata);
    }

    updateFormData(e) {
        if (!e) return;
        let field = e.target.name;
        let value = e.target.value;
        let newdata = {...this.props.data, [field]: value};

        this.props.PaymentActions.updateFormData(newdata);
    }

    submit() {
        if ($('#form-payment').valid()) {
            helper.showNotification("Đang lưu...");
            if (!this.props.params.paymentId) {
                let newdata = {...this.props.data, staff_id: this.props.user.id};
                this.props.PaymentActions.addPayment(newdata);
            }
            else this.props.PaymentActions.editPayment(this.props.params.paymentId, this.props.data);
        } else helper.showErrorNotification("Vui lòng nhập đủ các thông tin");
    }

    cancel() {
        helper.confirm('error', 'Hủy', "Bạn muốn từ chối yêu cầu này?", () => {
            browserHistory.push("administration/propose-payment");

        });
    }

    render() {
        return (
            <div className="content">
                <form role="form" id="form-payment" onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">

                                <div className="card-content">
                                    <h4 className="card-title"><strong> Tạo đề xuất </strong></h4>
                                    <div className="row">{
                                        (this.props.isLoadingCompanies) ? <Loading/> :

                                            <div>
                                                <div className="col-md-6">
                                                    <label>
                                                        Bên gửi
                                                    </label>
                                                    <ReactSelect
                                                        required
                                                        disabled={false}
                                                        options={this.changeCompanies()}
                                                        onChange={this.updateFormDataPayer}
                                                        value={this.props.data.payer.id || ""}
                                                        defaultMessage="Tuỳ chọn"
                                                        name="payer"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <FormInputText
                                                        label="Số tài khoản"
                                                        type="text"
                                                        name="stk2"
                                                        value={this.props.data.payer.account_number || ""}

                                                    />

                                                </div>
                                                <div className="col-md-6">
                                                    <label>
                                                        Bên nhận
                                                    </label>
                                                    <ReactSelect
                                                        required
                                                        disabled={false}
                                                        options={this.changeCompanies()}
                                                        onChange={this.updateFormDataReceiver}
                                                        value={this.props.data.receiver.id || ""}
                                                        defaultMessage="Tuỳ chọn"
                                                        name="receiver"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <FormInputText
                                                        label="Số tài khoản"
                                                        type="text"
                                                        name="stk"
                                                        value={this.props.data.receiver.account_number || ""}

                                                    />

                                                </div>
                                                <div className="col-md-6">
                                                    <label/>
                                                    <FormInputMoney
                                                        label="Số tiền"
                                                        type="text"
                                                        required
                                                        name="money_value"
                                                        updateFormData={this.updateFormData}
                                                        value={this.props.data.money_value || ""}

                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <FormInputDate
                                                        id="dealine-payment"
                                                        name="deadline"
                                                        value={this.props.data.deadline ?  moment(this.props.data.deadline, [DATETIME_FORMAT_SQL, DATE_FORMAT]).format(DATE_FORMAT) : moment(moment.now()).format(DATE_FORMAT)}
                                                        updateFormData={this.updateFormData}
                                                        label="Hạn thanh toán"
                                                        format={DATE_FORMAT}
                                                        placeholder={DATE_FORMAT}
                                                        required={true}
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Nội dung"
                                                        type="text"
                                                        name="description"
                                                        updateFormData={this.updateFormData}
                                                        value={this.props.data.description || ""}

                                                    />
                                                </div>
                                                <div className="col-md-12"
                                                     style={{display: "flex", flexFlow: "row-reverse"}}>
                                                    {this.props.isSavingPayment ?
                                                        <div>
                                                            <button disabled className="btn btn-rose  disabled"
                                                                    type="button">
                                                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                                            </button>
                                                            <button className="btn  disabled"
                                                                    type="button">
                                                                Hủy
                                                            </button>
                                                        </div>
                                                        :
                                                        <div>
                                                            <button onClick={this.submit}
                                                                    className="btn btn-rose"
                                                            >Lưu
                                                            </button>
                                                            <button className="btn"
                                                                    onClick={this.cancel}
                                                                    type="button">
                                                                Hủy
                                                            </button>
                                                        </div>
                                                    }

                                                </div>
                                            </div>


                                    }</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-content">
                                    <h4 className="card-title"><strong>Thông tin</strong></h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Avatar
                                                url={this.props.data.staff ? this.props.data.staff.avatar_url : this.props.user.avatar_url}
                                                size={100}
                                                style={{width: "100%", height: 170, maxHeight: 170, maxWidth: 170}}
                                            /><br/>
                                        </div>
                                        <div className="col-md-12">
                                            <label>Tên nhân viên</label>
                                            <div>{this.props.data.staff ? this.props.data.staff.name : this.props.user.name}</div>
                                        </div>

                                        <div className="col-md-12">
                                            <label>SĐT</label>
                                            <div>{this.props.data.staff ? this.props.data.staff.phone : this.props.user.phone}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="col-md-4">*/}
                        {/*<div className="card">*/}
                        {/*<div className="card-content">*/}
                        {/*<h4 className="card-title">Ảnh hóa đơn</h4>*/}

                        {/*{*/}
                        {/*this.props.isUploading ? (*/}
                        {/*<div className="progress">*/}
                        {/*<div className="progress-bar" role="progressbar" aria-valuenow="70"*/}
                        {/*aria-valuemin="0" aria-valuemax="100"*/}
                        {/*style={{ width: `${this.props.percent}%` }}>*/}
                        {/*<span className="sr-only">{this.props.percent}% Complete</span>*/}
                        {/*</div>*/}
                        {/*</div>*/}

                        {/*) : (*/}
                        {/*<div>*/}
                        {/*<div style={{*/}
                        {/*maxWidth: "100%",*/}
                        {/*lineHeight: "250px",*/}
                        {/*marginBottom: "10px",*/}
                        {/*textAlign: "center",*/}
                        {/*verticalAlign: "middle",*/}
                        {/*boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",*/}
                        {/*border: "0 none",*/}
                        {/*display: "inline-block"*/}
                        {/*}}>*/}
                        {/*<a href={this.props.link || this.props.data.bill_image_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}*/}
                        {/*target="_blank"*/}
                        {/*>*/}
                        {/*<img*/}
                        {/*src={this.props.link || this.props.data.bill_image_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}*/}
                        {/*style={{*/}
                        {/*lineHeight: "164px",*/}
                        {/*height: "auto",*/}
                        {/*maxWidth: "100%",*/}
                        {/*maxHeight: "100%",*/}
                        {/*display: "block",*/}
                        {/*marginRight: "auto",*/}
                        {/*marginLeft: "auto",*/}
                        {/*backgroundSize: "cover",*/}
                        {/*backgroundPosition: "center",*/}
                        {/*borderRadius: "4px",*/}
                        {/*}} />*/}
                        {/*</a>*/}
                        {/*</div>*/}

                        {/*<UploadButton*/}
                        {/*style={{*/}
                        {/*width: "100%"*/}
                        {/*}}*/}
                        {/*className="btn btn-rose"*/}
                        {/*onChange={this.handleUpload}>*/}
                        {/*Chọn ảnh*/}
                        {/*</UploadButton>*/}
                        {/*</div>*/}
                        {/*)*/}
                        {/*}*/}

                        {/*</div>*/}
                        {/*</div>*/}

                        {/*</div>*/}

                    </div>
                </form>
            </div>
        );
    }
}

CreateProposePaymentContainer.propTypes = {
    isSavingPayment: PropTypes.bool.isRequired,
    isLoadingCompanies: PropTypes.bool.isRequired,
    isUploading: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    companies: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    percent: PropTypes.number.isRequired,
    params: PropTypes.object,
    PaymentActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isSavingPayment: state.payment.isSavingPayment,
        isLoadingCompanies: state.payment.isLoadingCompanies,
        isUploading: state.payment.isUploading,
        link: state.payment.link,
        companies: state.payment.company,
        data: state.payment.payment,
        percent: state.payment.percent,
        user: state.login.user,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        PaymentActions: bindActionCreators(PaymentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProposePaymentContainer);