import React from "react";
import {Link} from 'react-router';
import PropTypes from "prop-types";
import * as helper from "../../../helpers/helper";

class PaymentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Bên gửi</th>
                        <th>Bên nhận</th>
                        <th>Số tiền</th>
                        <th>Nội dung</th>
                        <th> Hạn thanh toán </th>
                        <th> Ngày tạo </th>
                        <th>Trạng thái</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((pp) => {
                            return (
                                <tr key={pp.id}>
                                    <td/>
                                    <td>{pp.payer.name}</td>
                                    <td>{pp.receiver.name}</td>
                                    <td>{helper.dotStringNumber(pp.money_value)}</td>
                                    <td> {pp.description ? pp.description : "Không có"}</td>
                                    <td> {pp.deadline} </td>
                                    <td> {pp.created_at} </td>
                                    <td>
                                        {pp.status === 0 ? "Chưa duyệt" : "Đã duyệt"}
                                    </td>
                                    <td>
                                        { (pp.status === 0) ?
                                        <div className="btn-group-action">
                                            <a data-toggle="tooltip" title="Duyệt"
                                               onClick={() => this.props.changeStatus(pp.id, 1)} type="button"
                                               rel="tooltip">
                                                <i className="material-icons">done</i>
                                            </a>
                                            <div style={{display: "inline-block"}}>
                                                <Link data-toggle="tooltip" title="Sửa"
                                                      to={"/administration/propose-payment/edit/" + pp.id}
                                                      type="button" rel="tooltip">
                                                    <i className="material-icons">edit</i>
                                                </Link>
                                            </div>
                                            <a data-toggle="tooltip" title="Thông tin"
                                               onClick={() => this.props.openInfoModal(pp)} type="button"
                                               rel="tooltip">
                                                <i className="material-icons">info</i>
                                            </a>
                                        </div> : null }
                                    </td>
                                    <td/>
                                </tr>
                            );
                        })
                    }
                    </tbody>

                </table>
            </div>
        );
    }
}

PaymentList.propTypes = {
    data: PropTypes.array.isRequired,
    openInfoModal: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
};
export default PaymentList;