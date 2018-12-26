import React from "react";
import * as prj1Action from "../prj1Action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import DetailModal from "./DetailModal";
import {confirm} from "../../../helpers/helper";
import TooltipButton from "../../../components/common/TooltipButton";



class DetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() {
        this.props.prj1Action.tabChose(2);
        this.props.prj1Action.getDetail(this.props.handleMeetingModal.id);

    }
    delete(id1, id2){
        confirm("error", "Xóa", "Bạn có chắc muốn xóa?", () => {
            this.props.prj1Action.deleteDetail(id1, id2);
        });
    }

    render() {
        let mt = this.props.handleMeetingModal;
        let dt = this.props.detail;
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>{mt.name}</strong>
                            </h4>
                            <br/>
                            <div>
                                <h5><span style={{color: "tomato"}}>Nội dung: </span>
                                    {mt.content}</h5>
                                <div className="row">
                                    <div className="col-md-4 col-xs-4">
                                        <h5>Điều hành: <b>{mt.leader}</b></h5>
                                        <h5>Thư ký: <b>{mt.secretary}</b></h5>
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        {
                                            JSON.parse(mt.members) && JSON.parse(mt.members).map((mem, index) => {
                                                return (
                                                    <p key={index}>Member: <b>{mem}</b></p>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className="col-md-4 col-xs-4">
                                        <h5>Start Date: {mt.date_time.slice(0, 10)}</h5>
                                        <h5>Start Time: {mt.date_time.slice(11, 19)} </h5>
                                        <h5>Room: {mt.room_name}</h5>
                                    </div>
                                </div>
                                <hr/>
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <span style={{color: "tomato"}}>Chi tiết cuộc họp:</span>
                                    </h4>

                                    <div>
                                        <TooltipButton
                                            placement="top"
                                            text="Thêm chi tiết">
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                type="button"
                                                onClick={() => {
                                                    this.props.prj1Action.handleDetailModal({});
                                                    this.props.prj1Action.openDetailModal();
                                                }}>

                                                <strong>+</strong>
                                            </button>
                                        </TooltipButton>
                                    </div>

                                </div><br/>

                                {
                                    dt && dt.map((aa, index) => {
                                        return (
                                            <p key={index}>
                                                <b> {aa.time} &emsp; {aa.name}:</b>
                                                &emsp;{aa.content}
                                                &emsp;<span style={{color: "#878787"}}>
                                                <i className="material-icons" style={{fontSize: 18}}
                                                onClick={()=>{
                                                    this.props.prj1Action.handleDetailModal(aa);
                                                    this.props.prj1Action.openDetailModal();
                                                }}
                                                >edit</i>
                                                <i style={{fontSize: 18}} className="material-icons"
                                                onClick={()=>{
                                                    this.delete(mt.id, aa.id);
                                                }}
                                                >delete</i>
                                            </span>
                                            </p>
                                        );
                                    })
                                }
                                <br/>
                                <hr/>
                                <p style={{textAlign: "center"}}>Kết thúc cuộc họp </p>
                            </div>

                        </div>
                    </div>
                </div>
                <DetailModal/>
            </div>
        );

    }
}

DetailContainer.propTypes = {
    prj1Action: PropTypes.object.isRequired,
    detail: PropTypes.array.isRequired,
    handleMeetingModal: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        detail: state.prj1.detail,
        handleMeetingModal: state.prj1.handleMeetingModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prj1Action: bindActionCreators(prj1Action, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);