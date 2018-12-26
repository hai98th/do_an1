/**
 * Created by phanmduong on 11/20/17.
 */
import React from 'react';
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import {CirclePicker} from "react-color";
import PropTypes from 'prop-types';

class StoreCampaign extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            color: ''
        };
        this.changeColor = this.changeColor.bind(this);
        this.storeMarketingCampaign = this.storeMarketingCampaign.bind(this);
    }

    componentWillMount() {
        this.setState({
            id: this.props.campaign.id,
            name: this.props.campaign.name,
            color: this.props.campaign.color,
        });
    }

    changeColor(color) {
        this.setState({color: color.hex});
    }

    storeMarketingCampaign() {
        helper.setFormValidation("#form-store-campaign");
        if ($("#form-store-campaign").valid()) {
            this.props.storeMarketingCampaign(this.state);
        }
    }

    render() {
        return (
            <form id="form-store-campaign" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <FormInputText
                    label="Tên chiến dịch"
                    name="name"
                    updateFormData={(event) => this.setState({
                        name: event.target.value
                    })}
                    value={this.state.name}
                    required
                    type="text"
                />
                <h4 className="card-title">Màu chiến dịch</h4>
                <CirclePicker width="100%"
                              color={this.state.color}
                              onChangeComplete={this.changeColor}
                />
                <div className="row">
                    {this.props.isStoringCampaign ?
                        <div className="col-md-12">
                            <button
                                type="button"
                                className="btn btn-success disabled">
                                <i className="material-icons">save</i> Đang thêm
                            </button>
                            <button className="btn btn-danger disabled">
                                <i className="material-icons">cancel</i> Huỷ
                            </button>
                        </div>
                        :
                        <div className="col-md-12">

                            <button className="btn btn-success" onClick={this.storeMarketingCampaign}>
                                <i className="material-icons">save</i> Thêm
                            </button>
                            <button className="btn btn-danger" onClick={this.props.closeModal}>
                                <i className="material-icons">cancel</i> Huỷ
                            </button>
                        </div>
                    }
                </div>
            </form>
        );
    }
}

StoreCampaign.propTypes = {
    closeModal: PropTypes.func.isRequired,
    storeMarketingCampaign: PropTypes.func.isRequired,
    isStoringCampaign: PropTypes.bool.isRequired,
    campaign: PropTypes.array.isRequired,
};

export default (StoreCampaign);
