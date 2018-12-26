import React from 'react';
import FormInputText from '../../../components/common/FormInputText';
import {CirclePicker} from 'react-color';
import PropTypes from 'prop-types';



class GeneralInfoGroup extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {name, description, color, order_value, delivery_value,currency_value,ship_price} = this.props.groupCustomerForm;
        return(
        <div>
            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">edit</i>
                        </div>



                        <div className="card-content">
                            <h4 className="card-title">
                                Sửa nhóm khách hàng
                            </h4>
                            <FormInputText
                                label="Tên nhóm"
                                name="name"
                                updateFormData={this.props.editFormData}
                                type="text"
                                value={name}
                            />
                            <FormInputText
                                label="Mô tả"
                                name="description"
                                updateFormData={this.props.editFormData}
                                type="text"
                                value={description}
                            />

                            <div className="row">
                                <h4 className="col-sm-2" style={{marginTop: 25 , paddingLeft : 10}}>Rule : </h4>
                                <div className="col-sm-10">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group label-floating is-empty">
                                                <label className="control-label"/>
                                                <FormInputText
                                                    label="Tiền mua theo đơn"
                                                    name="order_value"
                                                    updateFormData={this.props.editFormData}
                                                    type="number"
                                                    value={order_value}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group label-floating is-empty">
                                                <label className="control-label"/>
                                                <FormInputText
                                                    label="Tiền mua theo đơn"
                                                    name="delivery_value"
                                                    updateFormData={this.props.editFormData}
                                                    type="number"
                                                    value={delivery_value}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-2 label-on-left">Tỉ giá</label>
                                <div className="col-sm-10">
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label"/>
                                        <FormInputText
                                            label="Tỉ giá (đ)"
                                            name="currency_value"
                                            updateFormData={this.props.editFormData}
                                            type="number"
                                            value={currency_value}
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <label className="col-sm-2 label-on-left">Giá đặt hàng</label>
                                <div className="col-sm-10">
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label"/>
                                        <FormInputText
                                            label="Giá đặt hàng (đ)"
                                            name="ship_price"
                                            updateFormData={this.props.editFormData}
                                            type="number"
                                            value={ship_price}
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    {/*-----------------PICK COLOR------------------*/}
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">contacts</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Chọn màu</h4>
                            <CirclePicker width="100%"
                                          color={color || ""}
                                          onChangeComplete={this.props.changeColor}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
        );
    }
}

GeneralInfoGroup.propTypes = {
    groupCustomerForm: PropTypes.object,
    editFormData: PropTypes.func,
    changeColor: PropTypes.func,

};
export default GeneralInfoGroup;
